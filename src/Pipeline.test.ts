import {Pipeline} from './Pipeline'
import { CommandStep } from './CommandStep'
import { DockerPlugin } from '.'

describe('Pipeline', () => {
  test('build', () => {

    const pipeline = new Pipeline({
      steps: [
        new CommandStep('yarn run lint'),

        new CommandStep([
          'cd dir',
          'yarn run build'
        ]),

        new CommandStep({
          command: ['']
        })
      ]
    })
    
    expect(pipeline.build()).toMatchSnapshot()
  })


  test('checks', () => {

    const typecheck = new CommandStep({
      label: ':typescript: check:workspaces (back-end)',
      branches: [
        'master',
        'preview',
        'production',
      ],
      command: [
        "set -e",
        "cd back-end",
        "yarn install --frozen-lockfile --development",
        "yarn run setup",
        "yarn run check:workspaces"
      ],
      plugins: [
        new DockerPlugin()
      ]
    })

    const pipeline = new Pipeline({
      steps: [
        typecheck,

        new CommandStep([
          'cd dir',
          'yarn run build'
        ]),

        new CommandStep({
          command: ['']
        })
      ]
    })
    
    expect(pipeline.build()).toMatchSnapshot() 
  })
})