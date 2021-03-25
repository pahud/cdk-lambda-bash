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
    assetHash: 'd14db8cb6745fe5db38519bf27be8c5d81753db709c73ac3a799756da48ac28f',
  });
});
