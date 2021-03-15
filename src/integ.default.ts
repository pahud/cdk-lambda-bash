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

    const stack = new cdk.Stack(app, 'my-stack-dev', { env: devEnv });

    new BashExecFunction(stack, 'Demo', {
      script: path.join(__dirname, '../demo.sh'),
      dockerfile: path.join(__dirname, '../Dockerfile'),
    }).run();

    app.synth();
    this.stack = [stack];
  }
}

new IntegTesting();


