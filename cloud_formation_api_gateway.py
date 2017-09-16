from troposphere import Base64, Select, FindInMap, GetAtt, GetAZs, Join, Output, If, And, Not, Or, Equals, Condition
from troposphere import Parameter, Ref, Tags, Template
from troposphere.cloudformation import Init
from troposphere.cloudfront import Distribution, DistributionConfig
from troposphere.cloudfront import Origin, DefaultCacheBehavior
from troposphere.ec2 import PortRange
from troposphere.iam import Role
from troposphere.apigateway import Resource
from troposphere.apigateway import Method
from troposphere.s3 import Bucket, WebsiteConfiguration


t = Template()

IamRoleApiGatewayS3 = t.add_resource(Role(
    "IamRoleApiGatewayS3",
    RoleName="role-apig-s3-read",
    AssumeRolePolicyDocument={ "Version": "2012-10-17", "Statement": [{ "Action": ["sts:AssumeRole"], "Effect": "Allow", "Principal": { "Service": ["apigateway.amazonaws.com"] } }] },
    Policies=[{ "PolicyName": "policy-apig-s3-read", "PolicyDocument": { "Version": "2012-10-17", "Statement": [{ "Action": ["s3:get*", "s3:list*"], "Resource": "*", "Effect": "Allow" }] } }],
    Path="/",
))

ApiGatewayResourceDefaultRoute = t.add_resource(Resource(
    "ApiGatewayResourceDefaultRoute",
    RestApiId=Ref("ApiGatewayRestApi"),
    PathPart="{path+}",
    ParentId=GetAtt("ApiGatewayRestApi", "RootResourceId"),
))

ApiGatewayResourceAssets = t.add_resource(Resource(
    "ApiGatewayResourceAssets",
    RestApiId=Ref("ApiGatewayRestApi"),
    PathPart="assets",
    ParentId=GetAtt("ApiGatewayRestApi", "RootResourceId"),
))

ApiGatewayResourceAssetsItem = t.add_resource(Resource(
    "ApiGatewayResourceAssetsItem",
    RestApiId=Ref("ApiGatewayRestApi"),
    PathPart="{item+}",
    ParentId=Ref(ApiGatewayResourceAssets),
))

ApiGatewayMethodIndexGet = t.add_resource(Method(
    "ApiGatewayMethodIndexGet",
    RestApiId=Ref("ApiGatewayRestApi"),
    MethodResponses=[{ "ResponseParameters": { "method.response.header.Content-Type": True, "method.response.header.Content-Length": True }, "StatusCode": 200 }],
    ResourceId=GetAtt("ApiGatewayRestApi", "RootResourceId"),
    AuthorizationType="NONE",
    Integration={ "IntegrationHttpMethod": "GET", "Credentials": GetAtt(IamRoleApiGatewayS3, "Arn"), "IntegrationResponses": [{ "ResponseParameters": { "method.response.header.Content-Type": "integration.response.header.Content-Type", "method.response.header.Content-Length": "integration.response.header.Content-Length" }, "StatusCode": 200 }], "Type": "AWS", "Uri": Join("", ["arn:aws:apigateway:", Ref("AWS::Region"), ":s3:path/", Ref("S3BucketFrontEnd"), "/index.html"]) },
    HttpMethod="GET",
))

ApiGatewayMethodDefaultRouteGet = t.add_resource(Method(
    "ApiGatewayMethodDefaultRouteGet",
    RestApiId=Ref("ApiGatewayRestApi"),
    MethodResponses=[{ "ResponseParameters": { "method.response.header.Content-Type": True, "method.response.header.Content-Length": True }, "StatusCode": 200 }],
    ResourceId=Ref(ApiGatewayResourceDefaultRoute),
    AuthorizationType="NONE",
    Integration={ "IntegrationHttpMethod": "GET", "Credentials": GetAtt(IamRoleApiGatewayS3, "Arn"), "IntegrationResponses": [{ "ResponseParameters": { "method.response.header.Content-Type": "integration.response.header.Content-Type", "method.response.header.Content-Length": "integration.response.header.Content-Length" }, "StatusCode": 200 }], "Type": "AWS", "Uri": Join("", ["arn:aws:apigateway:", Ref("AWS::Region"), ":s3:path/", Ref("S3BucketFrontEnd"), "/index.html"]) },
    HttpMethod="GET",
))

S3BucketFrontEnd = t.add_resource(Bucket(
    "S3BucketFrontEnd",
    AccessControl="PublicRead",
))

ApiGatewayMethodAssetsItemGet = t.add_resource(Method(
    "ApiGatewayMethodAssetsItemGet",
    RestApiId=Ref("ApiGatewayRestApi"),
    RequestParameters={ "method.request.path.item": True },
    MethodResponses=[{ "ResponseParameters": { "method.response.header.Content-Type": True, "method.response.header.Content-Length": True }, "StatusCode": 200 }],
    ResourceId=Ref(ApiGatewayResourceAssetsItem),
    AuthorizationType="NONE",
    Integration={ "IntegrationResponses": [{ "ResponseParameters": { "method.response.header.Content-Type": "integration.response.header.Content-Type", "method.response.header.Content-Length": "integration.response.header.Content-Length" }, "StatusCode": 200 }], "RequestParameters": { "integration.request.path.object": "method.request.path.item" }, "IntegrationHttpMethod": "GET", "Uri": Join("", ["arn:aws:apigateway:", Ref("AWS::Region"), ":s3:path/", Ref(S3BucketFrontEnd), "/{object}"]), "Credentials": GetAtt(IamRoleApiGatewayS3, "Arn"), "Type": "AWS" },
    HttpMethod="GET",
))

S3BucketFrontEndName = t.add_output(Output(
    "S3BucketFrontEndName",
    Value=Ref(S3BucketFrontEnd),
))

print(t.to_json())
