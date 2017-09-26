Lots of junk in here - currenlty not a readme






New Plan:
     - setup zappa excludes to exclude everything in frontend folder except build folder.
     - setup additional stages in zappa maybe?
     - serve frontend assets via lambda for now
          - test to see how slow this is, is it feasible to actually serve assets using lambda???
     - build basic frontend
     - build basic backend
     - add functionality for spotify, then last.fm, and add preferences.
     - add logging, error reporting, etc.
     - add about page, polish as necessary.






commands to remember:


plan for deplying this app
- setup hosting on aws and verfiy cert email
- deploy app to each stage
- after deploying to the stage, programatically modify cloudfront to work with s3 hosting...
    - I think we are going to have to setup our own cloudfront dist???
    - actually we could use the call back option to just call the modification to cloudfront part of the script.
    - ideally we would just setup our own cloud front distribution.
    - maybe we should do this by looking at what zappa is doing.














- create policy
- create role with that policy and certain trust levels or some bs
- setup methods/resources/response handler integrations/error code resolution bs in api gateway so it connects to s3.
-



- finally some answers I think:
  https://serverfault.com/questions/839197/how-can-i-use-aws-cloudfront-and-api-gateway-side-by-side-for-the-same-domain


this is the really good guide here:
  - https://www.codeengine.com/articles/process-form-aws-api-gateway-lambda/

  - I think I need to either do this by hand one time and give up on the easy setup nature with zappa or use cloudformation to specify this infrastructure or the api directly... seems kind of complicated but pretty awesome.
    - it'd be great if I automated the whole thing.


not really Ideal architecture setup:
  - 1. manages route53 dns
  - 2. creates api-gateway
  - 3. creates frontend s3 buckets for each api-gateway / staging site
  - 4. create cloudfront distribution with seperate origins
        1 for s3
        1 that points to api-gateway or lambda directly


to do:
  more reading - Lambda@Edge,

this might be what I want:

- https://github.com/sdd/serverless-apig-s3


Current plan:
- clone zappa cloudformation output so we have it
- also clone dns stuff so we have it.
- figure out how to match up or adjust current settings to work for cloud formation.
- draw insipriation on correct cloudformation setup from here:
  - https://github.com/sdd/serverless-apig-s3/blob/master/resources.yml
  - document this pretty well.
  - write blog post about it too so other people can tlak about it.


    - https://serverless.com/framework/docs/providers/aws/guide/intro/
    - https://github.com/awslabs/chalice
    - https://github.com/tmaiaroto/aegis
    - https://github.com/Miserlou/Zappa














    - api gateway questions
            - can I make the root level / redirect to s3 except /api ???
            - where does cloudfront fit into all of this

            - goodish guide: https://medium.com/@john.titus/moving-a-simple-api-to-amazon-s-api-gateway-680d025e0921


expects some env variables be set:
```
export LASTFM_API_KEY=
export LASTFM_SHARED_SECRET=
export STRAVA_CLIENT_ID=
export STRAVA_CLIENT_SECRET=
export STRAVA_BEARER=
```
strava fm.

runfm.party

- maybe some other domain name?

runfm.party - the unofficial Strava Song Syncer.


pulls down spotify or last.fm songs and puts them in your strava runs.

pulls down last.fm songs and puts them in your strava runs.

runfm.party


<!--  -->
maybe use google functions instead of aws lambda

https://cloud.google.com/source-repositories/

https://cloud.google.com/functions/docs/quickstart-console


google functions are js only but there is some shim but that seems complicated maybe??? idk.


aws lambda is really pretty cheap:

https://www.trek10.com/blog/lambda-cost/


kind of confusing example using lambda, api gateway, dynamno db:
https://cloudonaut.io/create-a-serverless-restful-api-with-api-gateway-cloudformation-lambda-and-dynamodb/

slightly better lambda example: https://medium.com/@jconning/tutorial-aws-lambda-with-api-gateway-36a8513ec8e3


need to read about dynamno db
decide on what backend framework (lean towards flask)

dynamo is free for my purposes
flask dynamo driver: https://github.com/rdegges/flask-dynamo




https://www.youtube.com/watch?v=mfAT38B_uhw



downsides of using zappa
  - every action is going to built around web requests, which adds some over head, and that overhead costs time and time is money with lambda.
    - this is no longer true - see:
      https://github.com/Miserlou/Zappa#executing-in-response-to-aws-events
    - also you can do async tasks directly! this is probably the easiest thing to use, instead of writing to dynamo db and reading the stream.
      https://github.com/Miserlou/Zappa#asynchronous-task-execution

pros of zappa:
  - easier to get started
  - simpler to deploy/update app
  - less pointing and clicking on the aws cli hopefully.
  - supports scheduling

questions:
  - zappa has a keep warm. do want to keep it warm?


architecture:

/
  - serve frontend

/api
  - api stuff
  /api/strava/new/{activity_id}
    - adds this event to dynamodb maybe???
    - then triggers async tasks to actually update description
    - responds that we got it request

  async task:
  / params(activity_id)
  / looks up user in our db, and on strava potentially.
  / pulls music from either last.fm or spotify
  / update activity description and note action in database

other api Stuff
  /auth/
    /strava/
    /spotify/
    /lastfm/
  /admin/
  /preferences/
    - use emojis
    - use spotify or last.fm
    - include external link
    (on this same preference page allow users to disable the app, remove/restore descriptions (which reads current description and removes any traces of the playlist))
  /backfill/
    - back fill old activities.
    - show status, how are we doing with this task.
    - options:
      - we can have the frontend drive this or the backend. backend is probably easier and more efficent, but then we need to output track status.


















app needs:

frontend servered by it's own thang.





frontend static
  log in with strava
  log in with last.fm

  store access tokens for both accounts in dynamo db under a user account thing.

user needs to be able to do the following:
  - disable account
    - deletes their user account

admin page:
  - serve some stats from dynamo db down to me? maybe some graphs.
  - these could be the project about page
    - total number of runs with songs we've analyzed
    - total users
    - total tracks analyzed

lambda endpoints for
  - admin Stuff
  - creating accounts

- maybe make one generic lambda function that can respond to all of the stuff?
- that might be an anti pattern idk.



- lambda for compute
- aws certifcate manager for ssl
	- disable whois guard when I purchase runparty.fm
	- because I want my real email address joer14@gmail.com to be associated
	- so that I can actually get the cert approval email from amazon
- dynamodb for database (because its free)
- API gateway to connect lambda functions to end points
	- ACM (amazon cert manager) works with api gateway out of the box
- name cheap for domain name
	- see if it supports this use case for bare domain names e.g. exmaaple.com
		- Can ACM renew certificates containing bare domains, such as “example.com” (also known as zone apex or naked domains)?
		- To improve ACM’s ability to automatically renew and deploy certificates containing bare domains, ensure that DNS lookup of the bare domain resolves to the AWS resource that is associated with the certificate. Resolving the bare domain to an AWS resource may be challenging unless you use Route 53 or another DNS provider that supports alias resource records (or their equivalent) for mapping bare domains to AWS resources. For more information, refer to the Route 53 Developer Guide.

- probably host the frontend on S3
-
 analytics
	- record with google analytics or something like that?
- logging with cloudwatch or whatever
	- alerts?
	  - cloudwatch can trigger alerts and send emails for certain reasons. number of errors reach certian threshold/etc
	    - it can be setup to send a SMS or email
	- alarms: billing exceeds certain threshold, certain number of failed jobs, if an api we are using goes down

- maybe if it fails, update the run description stating that an error occured, and we will retry later. and then retry later. If it still fails then we have a problem.
- do I want to collect user email addresses?


- can I setup a static webpage that is generated on the fly and posted to github pages?
- maybe I should just have it be a normal web app
	- a solid react app that just queries the backend would be simple enough...
	- I wonder if response time would be an issue. if the frontend loads instantly (because its hosted on s3), and then other requests like queries take a bit longer but don't cause a full page refresh, that might be okay.
- good resource : https://github.com/ryansb/hugo-lambd
	- if I use github pages route, we could update the description with a link to the playlist without having the page already created/uploaded. And then at a later date that page could be created/loaded.


The most important, basic thing is to update all runs description with the playlist, and save which activies we've updated into a database, and at what time we updated them. Then at a later date we can always update the description.

Also maybe if there is already a description, we should save it just in case??? idk

if you did include a link at every activity, it'd be easy to just have a lambda handler handle the query.


https://www.slideshare.net/AmazonWebServices/serverless-web-apps-using-api-gateway-lambda-and-dynamodb

question - do we need to have multiple lambdas

- one that triggers another lambda whenever strava posts to it?
