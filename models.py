from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute, JSONAttribute, NumberAttribute

from util import create_spotify_auth_url

class User(Model):
    """
    User
    """
    def as_json(self):
        lastfm = self.lastfm
        if lastfm is None:
            lastfm = {}
        spotify = self.spotify
        if spotify is None:
            spotify = {'login_url':create_spotify_auth_url()}
            print 'self.lastfm is bad'
        return dict(
            athlete_id=self.athlete_id,
            strava=self.strava,
            lastfm=lastfm,
            spotify=spotify,
        )

    class Meta:
        table_name = "user2" #should be an environmental variable + this field
    athlete_id = NumberAttribute(hash_key=True)
    strava = JSONAttribute(default=None)
    spotify = JSONAttribute(null=True,default=None)
    lastfm = JSONAttribute(null=True,default=None)
    tokens = JSONAttribute(null=True,default=None)
