import {Pipeline} from './Pipeline';
import {CommandStep} from './CommandStep';

describe('Pipeline', () => {

  describe('agents', () => {
    test('does not have agents when no agents are setup', () => {
      const pipeline = new Pipeline().build();
      expect(pipeline).not.toHaveProperty('agents')
    })

    test('has agents when agents are setup', () => {
      const pipeline = new Pipeline().agent('queue', 'macos').build();
      expect(pipeline).toHaveProperty('agents', expect.objectContaining({queue: 'macos'}))
    })
  })

  describe('notifications', () => {
    test('does not have notifications when no notifications are setup', () => {
      const pipeline = new Pipeline().build();
      expect(pipeline).not.toHaveProperty('notify')
    })

    test('has notifications when notifications are setup', () => {
      const notification = {email: 'james@example.com'}
      const pipeline = new Pipeline().notify(notification).build();
      expect(pipeline).toHaveProperty('notify', expect.arrayContaining([notification]))
    })
  })

  test('has steps', () => {
    const step1 = new CommandStep().command('echo "hello"');
    const step2 = new CommandStep().command('echo "world"');

    const pipeline = new Pipeline().step(step1).step(step2).build();

    expect(pipeline).toHaveProperty(
      'steps',
      expect.arrayContaining([
        expect.objectContaining(step1.build()),
        expect.objectContaining(step1.build()),
      ]),
    );
  });

});
