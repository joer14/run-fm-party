I run a decent amount, and record all of my runs on [Strava](https://www.strava.com/athletes/3587629).

I also enjoy listening to music and tracking all the music I listen to on [Last.fm](https://www.last.fm/user/joer14).

I thought it'd be cool if the playlist for my run was automatically synced to the run description, once I uploaded it, so I am building this application to do that, using AWS Lambda, API Gateway, and Flask. On the frontend I'm using react, redux, and redux saga.

This is not complete, or working yet, but it is getting close.

Todo
  - split up strava, spotify, last.fm stuff into their own files/modules.
  - change the models table names so they based on the environment.
  - clean up frontend
    - create a place to load last.fm user name and edit it.
    - add FAQ / getting started.
    - add activity level pages.
    - create preferences/user profile page.
  - ... everything else. 
