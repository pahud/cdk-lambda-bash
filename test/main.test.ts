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
    assetHash: '79d1d14d979cd2935d4dfa63ca0f5afae27cc627c30b156e03f05325218f7c6a',
  });
});
