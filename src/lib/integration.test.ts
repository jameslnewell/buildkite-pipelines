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
            new CommandStep().setLabel(':eslint: Lint').command('npm run lint'),
          ),
      )
      .addStep(
        new CommandStep()
          .setLabel(':jest: Test')
          .command('npm run test')
          .setKey('unit-test'),
      )
      .addStep(
        new CommandStep()
          .setLabel(':upload: Upload coverage')
          .agent('queue', 'arm')
          .command('npm run upload:coverage')
          .dependOn('unit-test')
          .plugin(new DockerPlugin().image('codeclimate/codeclimate')),
      )
      .addStep(new WaitStep())
      .addStep(new BlockStep().setLabel('🚀 Release').setKey('release'));
    const object = await pipeline.build();
    expect(await validate(object)).toHaveLength(0);
    expect(await stringify(object)).toMatchSnapshot();
  });
});
