import {Pipeline} from './Pipeline'
import { CommandStep, WaitStep, DockerPlugin } from './steps'

describe('Pipeline', () => {
  test('build', () => {

    const p = new Pipeline({
      steps: [
        new CommandStep('yarn run lint'),

        new CommandStep([
            'cd dir',
            'yarn run build'
          ]),

      ]
    })
    
    expect(p.build()).toMatchSnapshot()
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
        "yarn install --frozen-lockfile",
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

        new CommandStep(
          ''
        )
      ]
    })

    const p = new Pipeline({
      steps: [
        new CommandStep({}),
        new WaitStep()
      ]
    })

    expect(p.build()).toMatchSnapshot() 
  })
})


// const command = new CommandStep()
//   .withKey('')
//   .withLabel('')
  