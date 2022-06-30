import {StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {BaseStack} from './base-stack';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CicdDeployStack extends BaseStack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
