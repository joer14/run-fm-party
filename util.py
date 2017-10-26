import urllib
import os
from flask import url_for, jsonify


DEBUG = True
HOSTNAME = 'https://dev.runfm.party'
if DEBUG:
    HOSTNAME = 'http://localhost:3000'

def create_spotify_auth_url():

    # hostname = 'https://dev.runfm.party'
    # hostname = 'http://localhost:3000'
    # redirect_uri = hostname + '/api/v1/spotify/exchange/'
    redirect_uri = get_spotify_auth_redirect_uri()
    base = 'https://accounts.spotify.com/authorize?'
    params = {
      'client_id': os.getenv('SPOTIFY_CLIENT_ID'),
      'response_type': 'code',
      'scope':'user-read-recently-played user-read-currently-playing',
      'show_dialog':'true',
    }
    return base+urllib.urlencode(params)+'&redirect_uri=' + redirect_uri
    # return jsonify({'url':base+urllib.urlencode(params)+'&redirect_uri=' + redirect_uri})

def get_spotify_auth_redirect_uri():
    return HOSTNAME + url_for('spotify_exchange')

def create_strava_auth_url():
    redirect_uri = HOSTNAME + url_for('strava_exchange')
    base = 'https://www.strava.com/oauth/authorize?'
    params = {
      'client_id': os.getenv('STRAVA_CLIENT_ID'),
      'response_type': 'code',
      'scope':'write,view_private',
      'approval_prompt':'auto',
    }
    # return redirect(base+urllib.urlencode(params)+'&redirect_uri=' + redirect_uri, code=302)
    return jsonify({'url':base+urllib.urlencode(params)+'&redirect_uri=' + redirect_uri})
