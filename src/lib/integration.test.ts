import {stringify, validate} from '.';
import {CommandStep, GroupStep, WaitStep} from './builders';
import {BlockStep} from './builders/BlockStep';
import {Pipeline} from './builders/Pipeline';
import {DockerPlugin} from './builders/contrib';

describe('integration', () => {
  test('matches snapshot', async () => {
    const pipeline = new Pipeline()
      .step(
        new GroupStep()
          .label(':eslint: Lint group')
          .step(
            new CommandStep().label(':eslint: Lint').command('npm run lint'),
          ),
      )
      .step(
        new CommandStep()
          .label(':jest: Test')
          .command('npm run test')
          .key('unit-test'),
      )
      .step(
        new CommandStep()
          .label(':upload: Upload coverage')
          .agent('queue', 'arm')
          .command('npm run upload:coverage')
          .dependOn('unit-test')
          .plugin(new DockerPlugin().image('codeclimate/codeclimate')),
      )
      .step(new WaitStep())
      .step(new BlockStep().label('🚀 Release').key('release'));
    const object = await pipeline.build();
    expect(await validate(object)).toHaveLength(0);
    expect(await stringify(object)).toMatchSnapshot();
  });
});
