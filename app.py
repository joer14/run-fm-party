#!/usr/bin/env python
import boto3
import os
import urllib
import requests
import json
import pandas as pd
import datetime
from decimal import Decimal
from boto3.dynamodb.conditions import Key, Attr
from flask import Flask, jsonify, request, redirect, make_response, session, url_for

from models import User
from util import get_spotify_auth_redirect_uri, create_strava_auth_url

app = Flask(__name__,  static_url_path='', static_folder='build')  # serve frontend stuff from /build dir

secret_key = str(os.getenv('STRAVA_CLIENT_SECRET'))+str(os.getenv('SPOTIFY_CLIENT_SECRET'))+str(os.getenv('LASTFM_SHARED_SECRET'))
app.secret_key = secret_key

# frontend building/hackiness stuff
# this is super janky - but we can just serve the html and all static assets through lambda.
# this is a bad practice. I want to eventually setup s3 to host these files, ideally with
# cloudfront in front of them. See: https://github.com/Miserlou/Zappa/issues/444
# @app.route('/')
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@app.errorhandler(404) #let the frontend handle any 404s
def root(path):
    return app.send_static_file('index.html')

@app.route('/api/v1/', defaults={'username':None})
# @app.route('/api/v1/<username>')
def api_root(username=None):
    return jsonify({'some':'json', 'user': username, 'qs': request.query_string})
    # return 'This going to be an API!'

@app.route('/test')
def test():

    return jsonify({'url':URL})

def sketchy_jsonify(src):
    for key in src.keys():
        src[key] = str(src[key])
    return src




# # @app.route('/api/v1/spotify/gen_url')
# def create_spotify_auth_url():
#
#     # hostname = 'https://dev.runfm.party'
#     # hostname = 'http://localhost:3000'
#     # redirect_uri = hostname + '/api/v1/spotify/exchange/'
#     redirect_uri = HOSTNAME + url_for('spotify_exchange')
#     base = 'https://accounts.spotify.com/authorize?'
#     params = {
#       'client_id': os.getenv('SPOTIFY_CLIENT_ID'),
#       'response_type': 'code',
#       'scope':'user-read-recently-played user-read-currently-playing',
#       'show_dialog':'true',
#     }
#     return base+urllib.urlencode(params)+'&redirect_uri=' + redirect_uri
#     # return jsonify({'url':base+urllib.urlencode(params)+'&redirect_uri=' + redirect_uri})

@app.route('/api/v1/spotify/exchange/')
def spotify_exchange():
    ''' token exchange
    Exchange the temporary token from strava with a more permanent access token.
    Create a user in the user table with the info from strava.
    '''
    code = request.args.get('code')
    if code == None:
        # they probably denied us.... do something else.
        return

    exchange_url = 'https://accounts.spotify.com/api/token'
    redirect_uri = get_spotify_auth_redirect_uri()

    data = {
        'grant_type':'authorization_code',
        'code': code,
        'redirect_uri': redirect_uri,
        'client_id': os.getenv('SPOTIFY_CLIENT_ID'),
        'client_secret': os.getenv('SPOTIFY_CLIENT_SECRET'),
    }
    response = requests.post(exchange_url, data=data)

    content = json.loads(response.content)

    print content

    # todo
    # look up the user using their athelete_id in the session
    user = User.get(session['athlete_id'])
    user.tokens['spotify'] = content
    #since there is an expires in field, we should probably include the time we got the cert in the contents.
    #or maybe expires_in + current time, so we know when it will expire according to our current clock

    user.spotify = {'profile':{'name':'joe'}}
    # here we could instead do a query with our new credentials to populate the profile with some real info if we wanted to.
    # or we could just say account = active or something...
    user.save()
    # store the response content in the user profile object.

    #
    # user_obj = {
    #     'athlete_id': content['athlete']['id'],
    #     'strava_access_token': content['access_token'],
    # }
    # for k in content['athlete']:
        # user_obj['strava_'+k] = content['athlete'][k]
    #
    # dynamodb = boto3.resource('dynamodb', region_name='us-east-2')
    # table = dynamodb.Table('users')
    # response = table.put_item(
    #             Item=user_obj,
    # )
    # print 'setting athelete id in session', user_obj['athlete_id']
    # session['athlete_id'] = user_obj['athlete_id']
    return redirect('/success', code=302)


# everytime we make a request to spotify, we need to make sure we don't need to refresh the token for the user first.


@app.route('/api/v1/login')
def login():
    # if False:
    if 'athlete_id' in session:
        # create_spotify_auth_url
        user = User.get(session['athlete_id']).as_json()

        # payload = {'athlete':convert_dynamodb_to_dict(get_user_obj(session['athlete_id']))}
        # this should be another level up
        # user object should be
        # athelete_id,
        # strava = json blob of strava info
        # lastfm = json blob of last.fm info
        # spotify = json blob of spotify info

        # payload['athlete'].setdefault('spotify', )
        # payload['spotify'] = {'login_url':create_spotify_auth_url()}
        return jsonify(user)
    return create_strava_auth_url()

@app.route('/api/v1/logout')
def logout():
    session.clear()
    return jsonify({'status':'logged out'})

@app.route('/api/v1/strava/exchange')
def strava_exchange():
    ''' token exchange
    Exchange the temporary token from strava with a more permanent access token.
    Create a user in the user table with the info from strava.
    '''
    code = request.args.get('code')
    if code == None:
        # they probably denied us.... do something else.
        return

    # since is not None, we do a post to strava to get a perm key
    exchange_url = 'https://www.strava.com/oauth/token'
    data = {
      'client_id': os.getenv('STRAVA_CLIENT_ID'),
      'client_secret': os.getenv('STRAVA_CLIENT_SECRET'),
      'code': code,
    }
    response = requests.post(exchange_url, data=data)

    content = json.loads(response.content)
    athlete_id = content['athlete']['id']
    session['athlete_id'] = athlete_id

    tokens = {'strava_access_token': content['access_token']}
    strava_obj = content['athlete']
    try:
        user = User.get(athlete_id)
        user.tokens['strava_access_token'] = content['access_token']
        user.strava = strava_obj
        user.save()
    except User.DoesNotExist:
        if not User.exists():
            User.create_table(read_capacity_units=1, write_capacity_units=1, wait=True)
        user = User(athlete_id, strava=strava_obj, tokens=tokens).save()

    return redirect('/success', code=302)

def get_user_obj(athlete_id):
    ''' Given an athelete_id, get a user id from dynamodb '''
    dynamodb = boto3.resource('dynamodb', region_name='us-east-2')
    table = dynamodb.Table('users')
    response = table.get_item(Key={'athlete_id':int(athlete_id)})
    if 'Item' not in response:
        # 'Error - could not find that user in our db'
        return None
    return response['Item']

def make_strava_request(athlete_id, endpoint, params):
    user_obj = get_user_obj(athlete_id)
    access_token = user_obj['strava_access_token']
    headers = {'Authorization':'Bearer '+ access_token}
    r = requests.get(endpoint, headers=headers, params=params)
    return r

def convert_dict_for_dynamodb(in_dict):
    ''' takes a dict with some values that are floats, ints, etc.
        returns dicts with valid types for dynamodb

        checkout this issue for more robust fix: https://github.com/boto/boto3/issues/665
    '''
    for k in in_dict:
        # print k
        if type(in_dict[k]) in [float, int]:
            # print 'before', type(in_dict[k])
            in_dict[k] = Decimal(str(in_dict[k]))
            # print 'after', type(in_dict[k])
        if type(in_dict[k]) == list:
            in_dict[k] = str(in_dict[k])

    # print 'final dict'
    #
    # print '-'*70
    # for k in in_dict:
    #     print k, ',', type(in_dict[k])
    return in_dict

def convert_dynamodb_to_dict(in_dict):
    for k in in_dict:
        if type(in_dict[k]) == Decimal:
            in_dict[k] = float(in_dict[k])
        if type(in_dict[k]) == dict:
            in_dict[k] = convert_dynamodb_to_dict(in_dict[k])
    return in_dict

@app.route('/api/v1/load_activities/')
def load_all_user_activies():
    '''
        create another version that just updates stuff
    '''
    athlete_id = session['athlete_id']
    activities = []
    new_activies = None
    page_num = 0
    while new_activies is None or len(new_activies) > 0:
        page_num += 1
        params = {
            'page':page_num,
            'per_page':200
        }
        r = make_strava_request(athlete_id,'https://www.strava.com/api/v3/athlete/activities', params)
        new_activies = json.loads(r.text)
        activities = activities + new_activies
        print 'page num', page_num
        print 'len act', len(activities)
        print 'len new act', len(new_activies)

    print 'loaded all activies, now adding to dynamodb'
        # print type(activities)
    #
    # dynamodb = boto3.resource('dynamodb')
    dynamodb = boto3.resource('dynamodb', region_name='us-east-2')
    table = dynamodb.Table('activities')
    with table.batch_writer() as batch:
        for act in activities:
            act['athlete_id'] = Decimal(athlete_id)
            act['activity_id'] = act['id']
            act = convert_dict_for_dynamodb(act)
            batch.put_item(Item=act)
    return r.text

@app.route('/api/v1/dump_activities/')
def dump_all_user_activies():
    '''Specify type (json, csv) with type parameter
    '''
    athlete_id = session['athlete_id']

    file_type = request.args.get('type')
    if file_type not in [None, 'csv', 'json']:
        return 'Invalid File Type Specified'
    dynamodb = boto3.resource('dynamodb', region_name='us-east-2')
    table = dynamodb.Table('activities')
    response = table.query(
        KeyConditionExpression=Key('athlete_id').eq(Decimal(athlete_id))
    )
    resp = []
    for i in response['Items']:
        resp.append(convert_dynamodb_to_dict(i))

    if file_type == 'csv':
        filename = str(athlete_id)+'-strava-export-'+datetime.date.today().strftime('%Y-%M-%D')+'.csv'
        df = pd.DataFrame(resp)
        resp = make_response(df.to_csv(index=False, encoding='utf-8'))
        resp.headers["Content-Disposition"] = "attachment; filename=%s" % filename
        resp.headers["Content-Type"] = "text/csv"
        return resp
    else:
        return jsonify(resp)


if __name__ == "__main__":
    app.run()
