import { stringify } from "../stringify";
import { Pipeline } from "./Pipeline";
import { CommandStep } from "./steps";
import {
  DockerLoginPlugin,
  DockerPlugin,
  SecretsManagerPlugin,
} from "../contrib";
import fs from "fs";

describe("Pipeline", () => {
  // test('build', () => {

  //   const p = new Pipeline({
  //     steps: [
  //       new CommandStep('yarn run lint'),

  //       new CommandStep([
  //           'cd dir',
  //           'yarn run build'
  //         ]),

  //     ]
  //   })

  //   expect(p.build()).toMatchSnapshot()
  // })

  // test('checks', () => {

  //   const typecheck = new CommandStep()
  //   .label(':typescript: check:workspaces (back-end)')
  //   .command([
  //     "set -e",
  //     "cd back-end",
  //     "yarn install --frozen-lockfile --development",
  //     "yarn run setup",
  //     "yarn run check:workspaces"
  //   ])
  //   .branches([ 'master', 'preview', 'production'])
  //   .plugins([new DockerPlugin()])

  //   const pipeline = new Pipeline({
  //     steps: [
  //       typecheck,

  //       new CommandStep([
  //         'cd dir',
  //         'yarn run build'
  //       ]),

  //     ]
  //   })

  //   expect(pipeline.build()).toMatchSnapshot()
  // })

  test.only("secrets-docker-login-docker-cache", () => {


    const plugins = [
      SecretsManagerPlugin.builder()
        .env({
          GITHUB_TOKEN: {
            secretId: "global/buildkite/github",
            jsonKey: ".TOKEN",
          },
        }),
      DockerLoginPlugin.builder()
        .username("jameslnewell")
        .passwordEnv("GITHUB_TOKEN")
        .server("ghcr.io"),
      DockerPlugin.builder().image("ghcr.io/mr-yum/ci:2.4.0"),
    ];

    const pipeline = new Pipeline().steps([
      CommandStep.builder()
        .label(":typescript: check:workspaces (back-end)")
        .command([
          "set -e",
          "cd back-end",
          "yarn install --frozen-lockfile --development",
          "yarn run setup",
          "yarn run check:workspaces",
        ])
        .branches(["master", "preview", "production"])
        .plugins(plugins),
        CommandStep.builder()
        .label(':typescript: check:workspaces (back-end)')
        .branches([
          "!master",
          "!preview",
          "!production"
        ])
        .command([
          'set -e',
          'cd back-end',
          'yarn install --frozen-lockfile --development',
          'yarn run setup:workspaces --since master --include-dependencies --include-dependents',
          'yarn run check:workspaces --since master --include-dependents',
        ])
        .plugins(plugins),
        CommandStep.builder()
        .key('backend-unit-test')
        .label(':jest: test:unit (back-end)')
        .branches([
          "master",
          "preview",
          "production"
        ])
        .command([
          'set -e',
          'cd back-end',
          'yarn install --frozen-lockfile --development',
          'yarn run setup:workspaces',
          'yarn run test:unit -- --ignore manage-api -- --coverage --runInBand --forceExit',
        ])
        .plugins(plugins)
        .artifactPaths([
          'back-end/**/coverage/coverage-final.json',
          'back-end/**/coverage/**/coverage-final.json',
          'back-end/**/coverage/cobertura-coverage.xml',
          'back-end/**/coverage/**/cobertura-coverage.xml',
        ])
        .timeout(10),
        CommandStep.builder()
        .label(':coverage: coverage api')
        .branches([
          "master",
          "preview",
          "production"
        ])
        .dependsOn(['backend-unit-test'])
        .command([
          'npm install -g codecov',
          './scripts/upload-coverage.sh'
        ])
        .plugins([
          {
            ['artifacts#v1.5.0']: {
              download: ['**/*']
            }
          },
          SecretsManagerPlugin.builder()
          .env({
            CODECOV_TOKEN: {
              secretId: 'global/buildkite/codecov',
              jsonKey: '.TOKEN'
            }
          }),
          DockerPlugin.builder()
            .image('node:16-stretch')
            .environment([
              'FORCE_CLOUR=2',
              'CODECOV_TOKEN'
            ])
        ])
        .softFail(true),
        CommandStep.builder()
        .label(':jest: test:unit (back-end)')
        .key('backend-unit-test-branch')
        .branches([
          "!master",
          "!preview",
          "!production"
        ])
        .env({
          DOCKER_BUILDKIT: 1
        })
        .command([
          'set -e',
          'cd back-end',
          'yarn install --frozen-lockfile --development',
          'yarn run setup:workspaces --since master --include-dependencies',
          'yarn run test:unit -- --ignore manage-api -- --coverage --runInBand --forceExit --changedSince master',
        ])
        .plugins(plugins)
        .artifactPaths([
          'back-end/**/coverage/coverage-final.json',
          'back-end/**/coverage/**/coverage-final.json',
          'back-end/**/coverage/cobertura-coverage.xml',
          'back-end/**/coverage/**/cobertura-coverage.xml',
        ])
        .timeout(10),
    ]);
    expect(stringify(pipeline.build())).toEqual(
      fs
        .readFileSync("./fixtures/secrets-docker-login-docker-cache.yml")
        .toString()
    );
  });
});
