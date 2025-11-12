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
      const pipeline = await new Pipeline()
        .addNotification(notification)
        .build();
      expect(pipeline).toHaveProperty(
        'notify',
        expect.arrayContaining([notification]),
      );
    });
  });

  describe('env', () => {
    test('does not have env when no env are added', async () => {
      const pipeline = await new Pipeline().build();
      expect(pipeline).not.toHaveProperty('env');
    });
    test('does have env when env are added', async () => {
      const pipeline = await new Pipeline()
        .addEnv('FOO', 'bar')
        .addEnv('BAR', 'foo')
        .build();
      expect(pipeline).toHaveProperty(
        'env',
        expect.objectContaining({FOO: 'bar', BAR: 'foo'}),
      );
    });
  });

  test('has steps added various different ways', async () => {
    const checkStep = new CommandStep().addCommand('yarn run check');
    const buildStep = new CommandStep().addCommand('yarn run build');
    const testStep = new CommandStep().addCommand('yarn run test');

    const group = new Pipeline()
      .addSteps([checkStep, buildStep])
      .addStep(testStep);
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
