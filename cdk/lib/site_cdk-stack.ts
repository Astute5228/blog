import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StaticSite } from './static-site';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';

export interface StackProps extends cdk.StackProps {
  domainName: string;
  certificate?: Certificate;
}

export class SiteStack extends cdk.Stack { 
  constructor(scope: Construct, id: string, props: StackProps) { 
    super(scope, id, props); 
    
    new StaticSite(this, 'StaticSite', { domainName: props.domainName, certificate: props.certificate! });
  }
}

export class CertificateStack extends cdk.Stack {

  cert: Certificate;

  constructor(scope: Construct, id: string, props: StackProps) { 
    super(scope, id, props); 

    const zone = HostedZone.fromLookup(this, "Zone", { domainName: props.domainName });

    this.cert = new Certificate(this, "Certificate", {
      domainName: props.domainName,
      validation: CertificateValidation.fromDns(zone)
    });
  }
}
