import * as path from 'path';
import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';
import { BashExecFunction } from '.';


export class IntegTesting {
  readonly stack: cdk.Stack[];
  constructor() {
    const devEnv = {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    };

    const app = new cdk.App();

    const stack = new cdk.Stack(app, 'lambda-bash-dev', { env: devEnv });

    const fn = new BashExecFunction(stack, 'Demo', {
      script: path.join(__dirname, '../demo.sh'),
      dockerfile: path.join(__dirname, '../Dockerfile'),
      timeout: cdk.Duration.minutes(2),
      environment: {
        FOO: 'BAR',
      },
    });

    fn.run({ runOnUpdate: true });

    app.synth();
    this.stack = [stack];
  }
}

export class IntegTestingCustomRole {
  readonly stack: cdk.Stack[];
  constructor() {
    const devEnv = {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    };

    const app = new cdk.App();

    const stack = new cdk.Stack(app, 'lambda-bash-dev', { env: devEnv });

    const role = new iam.Role(stack, 'CustomRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaVPCAccessExecutionRole'),
      ],
    });

    const fn = new BashExecFunction(stack, 'Demo', {
      script: path.join(__dirname, '../demo-custom-role.sh'),
      dockerfile: path.join(__dirname, '../Dockerfile'),
      timeout: cdk.Duration.minutes(2),
      role,
    });

    fn.run({ runOnUpdate: true });

    app.synth();
    this.stack = [stack];
  }
}

// new IntegTesting();
new IntegTestingCustomRole();


