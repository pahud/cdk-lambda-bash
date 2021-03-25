import '@aws-cdk/assert/jest';
import * as path from 'path';
import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { BashExecFunction } from '../src';
import { IntegTesting } from '../src/integ.default';

test('integ snapshot validation', () => {
  const integ = new IntegTesting();
  integ.stack.forEach(stack => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});


test('re-execution on assets update', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'test-stack');
  new BashExecFunction(stack, 'Demo', {
    script: path.join(__dirname, '../demo.sh'),
  }).run({ runOnUpdate: true });
  expect(stack).toHaveResourceLike('AWS::CloudFormation::CustomResource', {
    assetHash: 'd5e611fbe2e9fa66608504727183fb0f1ce52c354df17ffd38a7203cb62eee09',
  });
});
