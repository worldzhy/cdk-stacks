import ecs = require('aws-cdk-lib/aws-ecs');
import ecs_patterns = require('aws-cdk-lib/aws-ecs-patterns');
import ec2 = require('aws-cdk-lib/aws-ec2');
import cdk = require('aws-cdk-lib');
import {BaseStack} from './base-stack';

export class FargateStack extends BaseStack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Get parameters
    const stackParams = this.node.tryGetContext('stackParams');
    const params = stackParams.FargateStack;

    // Create a cluster
    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', {vpcId: params.vpcId});
    const cluster = new ecs.Cluster(this, 'fargate-service-cluster', {vpc});

    // Create Fargate Service
    const fargateService =
      new ecs_patterns.ApplicationLoadBalancedFargateService(
        this,
        'application-loadbalanced-fargate-service',
        {
          cluster,
          taskImageOptions: {
            image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
          },
        }
      );

    // Setup AutoScaling policy
    const scaling = fargateService.service.autoScaleTaskCount({maxCapacity: 2});
    scaling.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: 50,
      scaleInCooldown: cdk.Duration.seconds(60),
      scaleOutCooldown: cdk.Duration.seconds(60),
    });

    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: fargateService.loadBalancer.loadBalancerDnsName,
    });
  }
}
