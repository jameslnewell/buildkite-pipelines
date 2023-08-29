import {stringify, validate} from '.';
import {CommandStep, GroupStep, WaitStep} from './builders';
import {BlockStep} from './builders/BlockStep';
import {Pipeline} from './builders/Pipeline';
import {DockerPlugin} from './builders/contrib';

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
          .setLabel(':jest: Test')
          .addCommand('npm run test')
          .setKey('unit-test'),
      )
      .addStep(
        new CommandStep()
          .setLabel(':upload: Upload coverage')
          .agent('queue', 'arm')
          .addCommand('npm run upload:coverage')
          .addDependency('unit-test')
          .addPlugin(new DockerPlugin().setImage('codeclimate/codeclimate')),
      )
      .addStep(new WaitStep())
      .addStep(new BlockStep().setLabel('🚀 Release').setKey('release'));
    const object = await pipeline.build();
    expect(await validate(object)).toHaveLength(0);
    expect(await stringify(object)).toMatchSnapshot();
  });
});
