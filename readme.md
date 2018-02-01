I run a decent amount, and record all of my runs on [Strava](https://www.strava.com/athletes/3587629).

I also enjoy listening to music and tracking all the music I listen to on [Last.fm](https://www.last.fm/user/joer14).

I thought it'd be cool if the playlist for my run was automatically synced to the run description, once I uploaded it, so I am building this application to do that, using AWS Lambda, API Gateway, and Flask. On the frontend I'm using react, redux, and redux saga as setup by [react boilerplate](https://github.com/react-boilerplate/react-boilerplate).

This is not complete, or working yet, but it is getting close.

Todo
  - split up strava, spotify, last.fm stuff into their own files/modules.
  - change the models table names so they based on the environment.
  - clean up frontend
    - create a place to load last.fm user name and edit it.
    - add remove/disconnect buttons for spotify/lastfm/entire app.
    - add FAQ / getting started.
    - add activity level pages.
    - create preferences/user profile page.
  - ... everything else.

Eventually
  - setup a better way of hosting the frontend using api gateway and s3 or cloudfront.
      - setup cloudfront directly in front api gateway
       - this should be pretty easy, we just won't cache post requests (and probably any requests to `/api`)
       - make sure that it caches frontend assets, but that there is a hash or manifest that doesn't get cached (or maybe a programatic way of purging the cache that we can call during the build process???)


# New Plan Feb 2018

- Okay this has gone on long enough, I need to make some progress.

Make this as dead simple as possible.

- Sign up screen for strava, spotify, last fm.
- Once connected, it just says, you have an account. And thats basically it. Nothing to configure at least at this point.

- How it operates - gets a new activity update.
  1. looks for music on spotify first.
  2. if user has lastfm
     - looks for music on lastfm.
     - if no music on last.fm then schedule a task to look 3 days later. or maybe some simple schedule,
        2 hrs from now, 6 hours from now, 12 hours, 24 hours, 24 hours, 24 hours,
  3. once it finds some music
     - edit the title to include emoji at the end of beginning or something
     - add the playlist
     - add a link to runfm.party
