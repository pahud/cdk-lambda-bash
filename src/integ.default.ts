import * as path from 'path';
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

new IntegTesting();


