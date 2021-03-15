import * as fs from 'fs';
import * as path from 'path';
import * as lambda from '@aws-cdk/aws-lambda';
import * as logs from '@aws-cdk/aws-logs';
import { CfnOutput, Construct, CustomResource, Duration } from '@aws-cdk/core';
import * as cr from '@aws-cdk/custom-resources';

export interface BashExecFunctionProps {
  /**
   * The path of the shell script to be executed.
   */
  readonly script: string;

  /**
   * The path of your custom dockerfile.
   */
  readonly dockerfile?: string;
}

export class BashExecFunction extends Construct {
  readonly handler: lambda.DockerImageFunction;
  constructor(scope: Construct, id: string, props: BashExecFunctionProps) {
    super(scope, id);

    if (props?.dockerfile && fs.existsSync(props?.dockerfile)) {
      // Copy your Dockerfile to Dockerfile.custom.
      fs.copyFileSync(props?.dockerfile, path.join(__dirname, '../docker.d/Dockerfile.custom') );
    }
    const dockerDirPath = path.join(__dirname, '../docker.d');
    const scriptPath = props.script;

    // copy the user script to the docker.d directory as main.sh so we can bundle it up into a new docker image
    const mainFile = path.join(dockerDirPath, '/main.sh');
    fs.copyFileSync(scriptPath, mainFile);

    this.handler = new lambda.DockerImageFunction(this, 'BashExecFunction', {
      code: lambda.DockerImageCode.fromImageAsset(dockerDirPath, {
        file: props?.dockerfile && fs.existsSync(props?.dockerfile) ? 'Dockerfile.custom': undefined,
      }),
      timeout: Duration.seconds(60),
      logRetention: logs.RetentionDays.ONE_DAY,
    });
    new CfnOutput(this, 'LogGroup', { value: this.handler.logGroup.logGroupName });
  }
  public run() {
    const onEvent = new lambda.DockerImageFunction(this, 'OnEventHandler', {
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../docker.d' ), {
        cmd: ['function.sh.onEvent'],
      }),
      environment: {
        LAMBDA_FUNCTION_ARN: this.handler.functionArn,
      },
      timeout: Duration.seconds(60),
    });
    const myProvider = new cr.Provider(this, 'MyProvider', {
      onEventHandler: onEvent,
    });
    new CustomResource(this, 'RunLambdaBash', { serviceToken: myProvider.serviceToken });
    this.handler.grantInvoke(onEvent.grantPrincipal);
  }

}
