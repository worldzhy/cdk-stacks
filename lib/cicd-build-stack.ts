import {StackProps, CfnOutput} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {BaseStack} from './base-stack';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as ecr from 'aws-cdk-lib/aws-ecr';

export class CicdBuildStack extends BaseStack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Get parameters
    const stackParams = this.node.tryGetContext('stackParams');
    const params = stackParams.CicdBuildStack;

    // Create a codecommit repo
    let constructId = id + '-codecommit-repo';
    const codecommitRepo = new codecommit.Repository(this, constructId, {
      repositoryName: params.repositoryName,
    });

    // Create a ECR repo
    constructId = id + '-ecr-repo';
    const ecrRepo = new ecr.Repository(this, constructId, {
      repositoryName: params.repositoryName,
    });

    // Outputs
    new CfnOutput(this, 'CodecommitRepoCloneUrl', {
      value: codecommitRepo.repositoryCloneUrlHttp,
    });

    new CfnOutput(this, 'EcrImageUrl', {
      value: ecrRepo.,
    });
  }
}
