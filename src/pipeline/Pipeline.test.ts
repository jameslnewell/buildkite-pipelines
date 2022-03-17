import { stringify } from '../stringify'
import {Pipeline} from './Pipeline'
import { CommandStep, DockerPlugin } from './steps'
import fs from 'fs'
import { SecretsManagerPlugin } from './steps/plugins/SecretsManagerPlugin'
import { DockerLoginPlugin } from './steps/plugins/DockerLoginPlugin'

describe('Pipeline', () => {
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


  test.only('secrets-docker-login-docker-cache', () => {
    const pipeline = new Pipeline().steps([
      new CommandStep()
        .label(':typescript: check:workspaces (back-end)')
        .command([
          'set -e',
          'cd back-end',
          'yarn install --frozen-lockfile --development',
          'yarn run setup',
          'yarn run check:workspaces'
        ])
        .branches([
          'master',
          'preview',
          'production'
        ])
        .plugins([
          new SecretsManagerPlugin().env({
            GITHUB_TOKEN: {
              secretId: 'global/buildkite/github',
              jsonKey: '.TOKEN'
            }
          }),
          new DockerLoginPlugin()
            .server('ghcr.io')
            .username('jameslnewell')
            .passwordEnv('GITHUB_TOKEN'),
          new DockerPlugin()
          .image('ghcr.io/mr-yum/ci:2.4.0')
        ])
    ])
    expect(stringify(pipeline.build())).toEqual(fs.readFileSync('./fixtures/secrets-docker-login-docker-cache.yml').toString())
  })
})

