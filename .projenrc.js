const { AwsCdkConstructLibrary } = require('projen');
const { Automation } = require('projen-automate-it');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new AwsCdkConstructLibrary({
  cdkVersion: '1.93.0',
  author: 'Pahud Hsieh',
  repositoryUrl: 'https://github.com/pahud/cdk-lambda-bash.git',
  description: 'Deploy Bash Lambda Functions with AWS CDK',
  defaultReleaseBranch: 'main',
  jsiiFqn: 'projen.AwsCdkConstructLibrary',
  name: 'cdk-lambda-bash',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-logs',
    '@aws-cdk/custom-resources',
  ],
  dependabot: false,
  deps: [
    'projen-automate-it',
  ],
  bundledDeps: [
    'projen-automate-it',
  ],
  cdkTestDependencies: [
    '@aws-cdk/aws-s3',
  ],
  publishToPypi: {
    distName: 'cdk-lambda-bash',
    module: 'cdk_lambda_bash',
  },
  catalog: {
    announce: false,
    twitter: 'pahudnet',
  },
});


const automation = new Automation(project, {
  automationToken: AUTOMATION_TOKEN,
});

automation.autoApprove();
automation.autoMerge();
automation.projenYarnUpgrade();
automation.projenYarnUpgrade('ProjenYarnUpdateTest', { yarnTest: true });


const common_exclude = ['cdk.out', 'cdk.context.json', 'images', 'yarn-error.log', 'dependabot.yml'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
