#!/usr/bin/env python
'''
Setup some aws resources that zappa does not create.
'''

AWS_REGION = 'us-east-2'

STAGES = ['dev','staging','production']

def create_frontend_buckets():
    '''
        For each stage, create a bucket and configure it for frontend hosting.
        If the bucket already exists, just configure it.
    '''
    # create bucket and set it up for hosting the frontend
    raise NotImplementedError

def configure_cloudfront():
    '''
        For each stage, configure cloudfront to serve frontend from the root url
    '''
    raise NotImplementedError

def create_dynamodb_tables():
    '''
        For each stage, create the necessary tables for the app, if they don't
        exist already.
    '''
    raise NotImplementedError

if __name__ == "__main__":
    print create_frontend_buckets()
    print create_dynamodb_tables()
    print configure_cloudfront()
