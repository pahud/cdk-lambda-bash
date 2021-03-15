[![NPM version](https://badge.fury.io/js/cdk-lambda-bash.svg)](https://badge.fury.io/js/cdk-lambda-bash)
[![PyPI version](https://badge.fury.io/py/cdk-lambda-bash.svg)](https://badge.fury.io/py/cdk-lambda-bash)
[![Release](https://github.com/pahud/cdk-lambda-bash/actions/workflows/release.yml/badge.svg)](https://github.com/pahud/cdk-lambda-bash/actions/workflows/release.yml)

# cdk-lambda-bash

Deploy Bash Lambda Functions with AWS CDK

# Why

AWS Lambda has the [docker container image support](https://aws.amazon.com/tw/blogs/aws/new-for-aws-lambda-container-image-support/) since AWS re:Invent 2020 which allows you to run your Lambda code in a custom container image. Inspired by [nikovirtala/cdk-eks-experiment](https://github.com/nikovirtala/cdk-eks-experiment/), `cdk-lambda-bash` allows you to specify a local shell script and bundle it up as a custom resource in your cdk stack. On cdk deployment, your shell script will be executed in a Lambda container environment.


# BashExecFunction

At this moment, we are offering `BashExecFunction` construct class which is a high-level abstraction of `lambda.Function`. By defining the `script` property which poins to your local shell script, on `cdk deploy`, this script will be bundled into a custom docker image and published as a `lambda.DockerImageFunction`.

If you `fn.run()`, a custom resource will be created and the `lambda.DockerImageFunction` will be executed on deployment.


# Sample

```ts
const app = new cdk.App();

const stack = new cdk.Stack(app, 'my-stack');

// bundle your Lambda function to execute the local demo.sh in container
const fn = new BashExecFunction(stack, 'Demo', {
  script: path.join(__dirname, '../demo.sh'),
})

// run it as custom resource on deployment
fn.run();

```

## Custom Dockerfile
In some cases, you may customize your own `Dockerfile`, for instances:

1. You need extra tools or utilities such as `kubectl` or `helm`
2. You need build from your own base image

In these cases, create a custom `Dockerfile` as below and add extra utilities i.e. `kubectl`:
<details><summary>click and view custom Dockerfile sample</summary>

```bash
FROM public.ecr.aws/lambda/provided:al2

RUN yum install -y unzip jq

# install aws-cli v2
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
  unzip awscliv2.zip && \
  ./aws/install

# install kubectl
RUN curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.19.6/2021-01-05/bin/linux/amd64/kubectl && \
  chmod +x kubectl && \
  mv kubectl /usr/local/bin/kubectl

COPY bootstrap /var/runtime/bootstrap
COPY function.sh /var/task/function.sh
COPY main.sh /var/task/main.sh
RUN chmod +x /var/runtime/bootstrap /var/task/function.sh /var/task/main.sh

WORKDIR /var/task
CMD [ "function.sh.handler" ]
```

</details>

Specify your own `Dockerfile` with the `dockerfile` property.
```ts
const app = new cdk.App();

    const stack = new cdk.Stack(app, 'my-stack-dev', { env: devEnv });

    new BashExecFunction(stack, 'Demo', {
      script: path.join(__dirname, '../demo.sh'),
      dockerfile: path.join(__dirname, '../Dockerfile'),
    }).run();

    app.synth();
```

# In Action

See this [tweet](https://twitter.com/pahudnet/status/1370301964836241408)

![](https://pbs.twimg.com/media/EwRGRxnUcAQBng-?format=jpg&name=4096x4096)

![](https://pbs.twimg.com/media/EwRKGfsUYAENjP-?format=jpg&name=4096x4096)
