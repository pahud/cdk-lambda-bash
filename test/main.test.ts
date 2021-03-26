import '@aws-cdk/assert/jest';
import * as path from 'path';
import { ResourcePart, SynthUtils } from '@aws-cdk/assert';
import * as s3 from '@aws-cdk/aws-s3';
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
  expect(stack).toHaveResourceLike('Custom::RunLambdaBash', {
    assetHash: 'd14db8cb6745fe5db38519bf27be8c5d81753db709c73ac3a799756da48ac28f',
  });
});

test('run should return custom resource', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'test-stack');
  const fn = new BashExecFunction(stack, 'Demo', {
    script: path.join(__dirname, '../demo.sh'),
  });
  const cr = fn.run({ runOnUpdate: true });
  const bucket = new s3.Bucket(stack, 'Bucket');
  cr.node.addDependency(bucket);
  expect(stack).toHaveResource('Custom::RunLambdaBash', {
    DependsOn: ['Bucket83908E77'],
  }, ResourcePart.CompleteDefinition);
});
