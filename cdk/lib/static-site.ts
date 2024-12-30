import * as cdk from 'aws-cdk-lib';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { AllowedMethods, Distribution, Function, FunctionCode, FunctionEventType, SecurityPolicyProtocol, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { S3BucketOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import path = require('path');

export interface StaticSiteProps {
  domainName: string;
  certificate: Certificate;
}

export class StaticSite extends Construct {
  constructor(parent: cdk.Stack, id: string, props: StaticSiteProps) {
    super(parent, id);

    const zone = HostedZone.fromLookup(this, "Zone", { domainName: props.domainName });

    new cdk.CfnOutput(this, "CertificateArn", { value: props.certificate.certificateArn })

    const bucket = new Bucket(this, 'S3Bucket', {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      publicReadAccess: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    new cdk.CfnOutput(this, "BucketName", { value: bucket.bucketName })

    const redirectFunc = new Function(this, "RedirectFunction", {
      code: FunctionCode.fromFile({ filePath: path.join(__dirname, "./redirect-func.js") }),
    })

    const dist = new Distribution(this, "CfDistribution", {
      certificate: props.certificate,
      defaultRootObject: "index.html",
      domainNames: [props.domainName],
      minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
      defaultBehavior: {
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        compress: true,
        origin: S3BucketOrigin.withOriginAccessControl(bucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [
          {
            function: redirectFunc,
            eventType: FunctionEventType.VIEWER_REQUEST
          }
        ]
      },
    });

    new cdk.CfnOutput(this, "CloudfrontUrl", {
      value: "https://${distribution.distributionDomainName}",
      description: "The Cloudfront URL"
    })

    new ARecord(this, "SiteAliasRecord", {
      recordName: props.domainName,
      target: RecordTarget.fromAlias(new CloudFrontTarget(dist)),
      zone
    });

    new BucketDeployment(this, "BucketDeployment", {
      sources: [
        Source.asset(path.join(__dirname, "../../_site"))
      ],
      destinationBucket: bucket,
      distribution: dist,
      distributionPaths: ['/*']
    })

  }
}
