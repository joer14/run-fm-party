#!/usr/bin/env python
import boto3
import botocore
'''
Setup some aws resources that zappa does not create.
'''

AWS_REGION = 'us-west-1' # us-east-1 was causing issues. AWS inconsistencies are the best

STAGES = ['dev','staging','production']

FRONTEND_BUCKET_PREFIX='run-fm-party'

def create_frontend_buckets():
    '''
        For each stage, create a bucket and configure it for frontend hosting.
        If the bucket already exists, just configure it.
    '''
    STAGES=['reallydev3']
    s3_client = boto3.client('s3')
    for stage in STAGES:
        bucket_name = '{}-{}'.format(FRONTEND_BUCKET_PREFIX,stage)
        # try:
        try:
            resp = s3_client.head_bucket(Bucket=bucket_name)
        except botocore.exceptions.ClientError:
            bucket = s3_client.create_bucket(
                ACL='public-read',
                Bucket=bucket_name,
                CreateBucketConfiguration={
                    'LocationConstraint': AWS_REGION
                },
            )
            resp = s3_client.head_bucket(Bucket=bucket_name)
        website_configuration = {
            'ErrorDocument': {'Key': 'index.html'},
            'IndexDocument': {'Suffix': 'index.html'},
        }
        s3_client.put_bucket_website(Bucket='bucket_name', WebsiteConfiguration=website_configuration)

    # create bucket and set it up for hosting the frontend
    # raise NotImplementedError
    return
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
    # print create_dynamodb_tables()
    # print configure_cloudfront()
