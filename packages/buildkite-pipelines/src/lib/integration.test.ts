import {stringify, validate} from './index.js';
import {CommandStep, GroupStep, WaitStep} from './builders/index.js';
import {BlockStep} from './builders/BlockStep.js';
import {Pipeline} from './builders/Pipeline.js';
import {DockerPlugin} from './builders/contrib/index.js';

describe('integration', () => {
  test('matches snapshot', async () => {
    const pipeline = new Pipeline()
      .addStep(
        new GroupStep()
          .setLabel(':eslint: Lint group')
          .addStep(
            new CommandStep()
              .setLabel(':eslint: Lint')
              .addCommand('npm run lint'),
          ),
      )
      .addStep(
        new CommandStep()
          .setKey('unit-test')
          .setLabel(':jest: Test')
          .addCommand('npm run test'),
      )
      .addStep(
        new CommandStep()
          .setLabel(':upload: Upload coverage')
          .addAgent('queue', 'arm')
          .addDependency('unit-test')
          .addCommand('npm run upload:coverage')
          .addPlugin(new DockerPlugin().setImage('codeclimate/codeclimate')),
      )
      .addStep(new WaitStep())
      .addStep(new BlockStep().setKey('release').setLabel('🚀 Release'));
    const object = await pipeline.build();
    expect(await validate(object)).toHaveLength(0);
    expect(await stringify(object)).toMatchSnapshot();
  });
});
