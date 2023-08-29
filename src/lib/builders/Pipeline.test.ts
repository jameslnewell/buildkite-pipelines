import {Pipeline} from './Pipeline';
import {CommandStep} from './CommandStep';

describe('Pipeline', () => {
  describe('agents', () => {
    test('does not have agents when no agents are setup', async () => {
      const pipeline = await new Pipeline().build();
      expect(pipeline).not.toHaveProperty('agents');
    });

    test('has agents when agents are setup', async () => {
      const pipeline = await new Pipeline().agent('queue', 'macos').build();
      expect(pipeline).toHaveProperty(
        'agents',
        expect.objectContaining({queue: 'macos'}),
      );
    });
  });

  describe('notifications', () => {
    test('does not have notifications when no notifications are setup', async () => {
      const pipeline = await new Pipeline().build();
      expect(pipeline).not.toHaveProperty('notify');
    });

    test('has notifications when notifications are setup', async () => {
      const notification = {email: 'james@example.com'};
      const pipeline = await new Pipeline().notify(notification).build();
      expect(pipeline).toHaveProperty(
        'notify',
        expect.arrayContaining([notification]),
      );
    });
  });

  test('has steps added various different ways', async () => {
    const checkStep = new CommandStep().command('yarn run check');
    const buildStep = new CommandStep().command('yarn run build');
    const testStep = new CommandStep().command('yarn run test');

    const group = new Pipeline().steps([checkStep, buildStep]).step(testStep);
    const object = await group.build();
    expect(object).toHaveProperty(
      'steps',
      expect.arrayContaining([
        await checkStep.build(),
        await buildStep.build(),
        await testStep.build(),
      ]),
    );
  });
});
