import {CommandStep} from './CommandStep';
import {Plugin} from './Plugin';

const installCommand = 'yarn install';
const buildCommand = 'yarn run build';
const dockerPlugin = 'docker#v3.11.0';

// test("foo", () => {
//   const step = new CommandStep()
//     .key("i-am-awesome")
//     .label(":yarn: install")
//     .command(installCommand)
//     .env({ GITHUB_TOKEN: "ghp_xxx" })
//     .plugin([])
//     .build();
//   console.log(step);
// });

describe(CommandStep.name, () => {
  describe('command', () => {
    test('array when single value', async () => {
      const step = await new CommandStep().command(installCommand).build();
      expect(step).toHaveProperty('commands', [installCommand]);
    });
    test('array when multiple commands provided', async () => {
      const step = await new CommandStep()
        .command(installCommand)
        .command(buildCommand)
        .build();
      expect(step).toHaveProperty('commands', [installCommand, buildCommand]);
    });
  });

  describe('env', () => {
    test('undefined when undefined', async () => {
      const step = await new CommandStep().command(':').build();
      expect(step).not.toHaveProperty('env');
    });
    test('defined when object', async () => {
      const step = await new CommandStep()
        .command(':')
        .env('FOO', 'bar')
        .build();
      expect(step).toHaveProperty('env.FOO', 'bar');
    });
  });

  describe('plugins', () => {
    test('undefined when not defined', async () => {
      const step = await new CommandStep().command(':');
      expect(step.build()).not.toHaveProperty('plugins');
    });
    test('defined when object', async () => {
      const object = await new CommandStep()
        .command(':')
        .plugin({[dockerPlugin]: null})
        .build();
      expect(object).toHaveProperty('plugins.0', {
        [dockerPlugin]: null,
      });
    });
    test('defined when builder', async () => {
      const object = await new CommandStep()
        .command(':')
        .plugin(new Plugin(dockerPlugin))
        .build();
      expect(object).toHaveProperty('plugins.0', {
        [dockerPlugin]: null,
      });
    });
  });

  describe('parallelism', () => {
    test('undefined by default', async () => {
      const step = await new CommandStep().command(':').build();
      expect(step).not.toHaveProperty('parallelism');
    });
    test('defined when 3', async () => {
      const step = await new CommandStep().command(':').parallelism(3).build();
      expect(step).toHaveProperty('parallelism', 3);
    });
  });

  describe('skip', () => {
    test('undefined by default', async () => {
      const step = await new CommandStep().command(':').build();
      expect(step).not.toHaveProperty('skip');
    });
    test('defined when true', async () => {
      const step = await new CommandStep().command(':').skip(true).build();
      expect(step).toHaveProperty('skip', true);
    });
    test('defined when false', async () => {
      const step = await new CommandStep().command(':').skip(false).build();
      expect(step).toHaveProperty('skip', false);
    });
  });

  describe('concurrency', () => {
    test('undefined by default', async () => {
      const step = await new CommandStep().command(':').build();
      expect(step).not.toHaveProperty('concurrency');
    });
    test('defined when 1', async () => {
      const step = await new CommandStep()
        .command(':')
        .concurrency('test', 1)
        .build();
      expect(step).toHaveProperty('concurrency', 1);
    });
  });

  describe('concurrency_group', () => {
    test('undefined by default', async () => {
      const step = await new CommandStep().command(':').build();
      expect(step).not.toHaveProperty('concurrency_group');
    });
    test('defined when 1', async () => {
      const step = await new CommandStep()
        .command(':')
        .concurrency('test', 1)
        .build();
      expect(step).toHaveProperty('concurrency_group', 'test');
    });
  });

  describe('soft_fail', () => {
    test('undefined by default', async () => {
      const step = await new CommandStep().command(':').build();
      expect(step).not.toHaveProperty('soft_fail');
    });

    test('defined when true', async () => {
      const step = await new CommandStep().command(':').softFail().build();
      expect(step).toHaveProperty('soft_fail', true);
    });
  });

  describe('timeout_in_minutes', () => {
    test('undefined by default', async () => {
      const step = await new CommandStep().command(':').build();
      expect(step).not.toHaveProperty('timeout_in_minutes');
    });

    test('defined when 2', async () => {
      const step = await new CommandStep().command(':').timeout(2).build();
      expect(step).toHaveProperty('timeout_in_minutes', 2);
    });
  });

  describe('agents', () => {
    test('undefined by default', async () => {
      const step = await new CommandStep().command(':').build();
      expect(step).not.toHaveProperty('agents');
    });

    test('defined when queue specified', async () => {
      const step = await new CommandStep()
        .command(':')
        .agent('queue', 'arm')
        .build();
      expect(step).toHaveProperty('agents', {queue: 'arm'});
    });
  });
});
