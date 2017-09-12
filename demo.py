#!/usr/bin/env python
# pull info about an activity (start date, end date)
# get all songs for user around that activity date
# print out list of songs
# update activity description
# a simple proof on concept

import requests
import json
import datetime
import time
import dateutil.parser
import calendar
import os
# pull info about an activity
LAST_FM_API_KEY = os.environ.get('LASTFM_API_KEY')
STRAVA_BEARER = os.environ.get('STRAVA_BEARER')


upload_id = 1178084536
# https://www.strava.com/activities/1178084536

def get_activity(activity_id):
    url = 'https://www.strava.com/api/v3/activities/%s' % activity_id
    header = {'Authorization':'Bearer '+STRAVA_BEARER}
    payload = {}
    r = requests.get(url,headers=header,data=payload)
    return json.loads(r.content)

def extract_info(activity):
    out = {}
    out['name']=activity['name']
    out['description']=activity['description']
    parsed_date = dateutil.parser.parse(activity['start_date'])
    out['start_uts']= calendar.timegm(parsed_date.utctimetuple())
    out['end_uts']= out['start_uts'] + int(activity['elapsed_time'])
    return out

def pretty_print_song(track):
    album = track['album']['#text']
    artist = track['artist']['#text']
    date = track['date']['#text']
    date = track['date']['uts']
    track = track['name']

    return '{} - {} - {}'.format(artist, track, album)
    # print 'Track:{}  Album:{} Artist:{} Date:{}'.format(track, album, artist, date)

def get_songs(from_time, to_time):
    url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user={}&api_key={}&format=json'.format('joer14',LAST_FM_API_KEY)
    header = {}
    payload = {'from':from_time, 'to':to_time, 'limit':200}
    r = requests.get(url,headers=header,data=payload)
    return json.loads(r.content)


def get_and_extract_songs(from_time, to_time):
    songs = get_songs(from_time,to_time)
    songs = songs['recenttracks']
    track_list = []
    for song in songs['track']:
        track_list.append(pretty_print_song(song))
    track_list_order = list(reversed(track_list))
    return track_list_order


activity = get_activity(upload_id)
relevant_info = extract_info(activity)
track_list = get_and_extract_songs(relevant_info['start_uts'],relevant_info['end_uts'])

# add some emojis here probably -like some random music sign or speakers or whatver
if relevant_info['description'] == None:
    relevant_info['description'] = ''
output_text = relevant_info['description'] + '\n \n \n' + 'Run Playlist, powered by https://runfm.party:\n \n'
for t in track_list:
    output_text = output_text + t+'\n'

def update_description(activity_id, description):
    url = 'https://www.strava.com/api/v3/activities/%s' % activity_id
    header = {'Authorization':'Bearer '+STRAVA_BEARER}
    payload = {'description':description}
    r = requests.put(url,headers=header,data=payload)
    return json.loads(r.content)


status = update_description(upload_id, output_text)
print status
