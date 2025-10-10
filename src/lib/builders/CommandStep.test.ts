import {CommandStep} from './CommandStep';
import {Plugin} from './Plugin';
import {ECRPlugin} from './contrib';

const installCommand = 'yarn install';
const buildCommand = 'yarn run build';
const dockerPlugin = 'docker#v3.11.0';

// test("foo", () => {
//   const step = new CommandStep()
//     .setKey("i-am-awesome")
//     .setLabel(":yarn: install")
//     .addCommand(installCommand)
//     .env({ GITHUB_TOKEN: "ghp_xxx" })
//     .addPlugin([])
//     .build();
//   console.log(step);
// });

describe(CommandStep.name, () => {
  describe('command', () => {
    test('array when single value', async () => {
      const step = await new CommandStep().addCommand(installCommand).build();
      expect(step).toHaveProperty('commands', [installCommand]);
    });
    test('array when multiple commands provided', async () => {
      const step = await new CommandStep()
        .addCommand(installCommand)
        .addCommand(buildCommand)
        .build();
      expect(step).toHaveProperty('commands', [installCommand, buildCommand]);
    });
  });

  describe('env', () => {
    test('undefined when undefined', async () => {
      const step = await new CommandStep().addCommand(':').build();
      expect(step).not.toHaveProperty('env');
    });
    test('defined when object', async () => {
      const step = await new CommandStep()
        .addCommand(':')
        .env('FOO', 'bar')
        .build();
      expect(step).toHaveProperty('env.FOO', 'bar');
    });
  });

  describe('plugins', () => {
    test('undefined when not defined', async () => {
      const step = await new CommandStep().addCommand(':');
      expect(step.build()).not.toHaveProperty('plugins');
    });
    test('defined when object', async () => {
      const object = await new CommandStep()
        .addCommand(':')
        .addPlugin({[dockerPlugin]: null})
        .build();
      expect(object).toHaveProperty('plugins.0', {
        [dockerPlugin]: null,
      });
    });
    test('defined when builder', async () => {
      const object = await new CommandStep()
        .addCommand(':')
        .addPlugin(new Plugin().setName(dockerPlugin))
        .build();
      expect(object).toHaveProperty('plugins.0', {
        [dockerPlugin]: null,
      });
    });
    test('can add multiple', async () => {
      const object = await new CommandStep()
        .command(':')
        .addPlugins([new ECRPlugin(), new Plugin(dockerPlugin)])
        .build();
      expect(object).toHaveProperty('plugins.0', {
        [ECRPlugin.PLUGIN]: {},
      });
      expect(object).toHaveProperty('plugins.1', {
        [dockerPlugin]: null,
      });
    });
  });

  describe('parallelism', () => {
    test('undefined by default', async () => {
      const step = await new CommandStep().addCommand(':').build();
      expect(step).not.toHaveProperty('parallelism');
    });
    test('defined when 3', async () => {
      const step = await new CommandStep()
        .addCommand(':')
        .setParallelism(3)
        .build();
      expect(step).toHaveProperty('parallelism', 3);
    });
  });

  describe('skip', () => {
    test('undefined by default', async () => {
      const step = await new CommandStep().addCommand(':').build();
      expect(step).not.toHaveProperty('skip');
    });
    test('defined when true', async () => {
      const step = await new CommandStep()
        .addCommand(':')
        .setSkip(true)
        .build();
      expect(step).toHaveProperty('skip', true);
    });
    test('defined when false', async () => {
      const step = await new CommandStep()
        .addCommand(':')
        .setSkip(false)
        .build();
      expect(step).toHaveProperty('skip', false);
    });
  });

  describe('concurrency', () => {
    test('undefined by default', async () => {
      const step = await new CommandStep().addCommand(':').build();
      expect(step).not.toHaveProperty('concurrency');
    });
    test('defined when 1', async () => {
      const step = await new CommandStep()
        .addCommand(':')
        .concurrency('test', 1)
        .build();
      expect(step).toHaveProperty('concurrency', 1);
    });
  });

  describe('concurrency_group', () => {
    test('undefined by default', async () => {
      const step = await new CommandStep().addCommand(':').build();
      expect(step).not.toHaveProperty('concurrency_group');
    });
    test('defined when 1', async () => {
      const step = await new CommandStep()
        .addCommand(':')
        .concurrency('test', 1)
        .build();
      expect(step).toHaveProperty('concurrency_group', 'test');
    });
  });

  describe('soft_fail', () => {
    test('undefined by default', async () => {
      const step = await new CommandStep().addCommand(':').build();
      expect(step).not.toHaveProperty('soft_fail');
    });

    test('defined when true', async () => {
      const step = await new CommandStep()
        .addCommand(':')
        .setSoftFail(true)
        .build();
      expect(step).toHaveProperty('soft_fail', true);
    });
  });

  describe('timeout_in_minutes', () => {
    test('undefined by default', async () => {
      const step = await new CommandStep().addCommand(':').build();
      expect(step).not.toHaveProperty('timeout_in_minutes');
    });

    test('defined when 2', async () => {
      const step = await new CommandStep().addCommand(':').timeout(2).build();
      expect(step).toHaveProperty('timeout_in_minutes', 2);
    });
  });

  describe('agents', () => {
    test('undefined by default', async () => {
      const step = await new CommandStep().addCommand(':').build();
      expect(step).not.toHaveProperty('agents');
    });

    test('defined when queue specified', async () => {
      const step = await new CommandStep()
        .addCommand(':')
        .agent('queue', 'arm')
        .build();
      expect(step).toHaveProperty('agents', {queue: 'arm'});
    });
  });

  describe('retries', () => {
    test('no retry property when no retries are set', async () => {
      const step = await new CommandStep().build();
      expect(step).not.toHaveProperty('retry');
    });

    test('no manual retry property when only automatic retries are set', async () => {
      const step = await new CommandStep()
        .addAutomaticRetry({exit_status: '*'})
        .build();
      expect(step).not.toHaveProperty('retry.manual');
    });

    test('no automatic retry property when only manual retry is set', async () => {
      const step = await new CommandStep().setManualRetry(true).build();
      expect(step).not.toHaveProperty('retry.automatic');
    });

    test('has manual retry property when manual retry is false', async () => {
      const step = await new CommandStep().setManualRetry(false).build();
      expect(step).toHaveProperty('retry.manual', false);
    });

    test('has manual retry property when manual retry is true', async () => {
      const step = await new CommandStep().setManualRetry(true).build();
      expect(step).toHaveProperty('retry.manual', true);
    });

    test('has manual retry property when manual retry is an object', async () => {
      const step = await new CommandStep()
        .setManualRetry({
          permit_on_passed: false,
          reason: 'Cannot retry a successful deployment',
        })
        .build();
      expect(step).toHaveProperty('retry.manual', {
        permit_on_passed: false,
        reason: 'Cannot retry a successful deployment',
      });
    });

    test('has automatic retry property when automatic retry is added', async () => {
      const step = await new CommandStep()
        .addAutomaticRetry({exit_status: 139, limit: 1})
        .build();
      expect(step).toHaveProperty('retry.automatic', [
        {
          exit_status: 139,
          limit: 1,
        },
      ]);
    });
  });

  describe('getCommands', () => {
    test('returns empty array when no commands added', () => {
      const step = new CommandStep();
      expect([...step.getCommands()]).toEqual([]);
    });

    test('returns commands when commands added', () => {
      const step = new CommandStep()
        .addCommand(installCommand)
        .addCommand(buildCommand);
      expect([...step.getCommands()]).toEqual([installCommand, buildCommand]);
    });
  });

  describe('getKey', () => {
    test('returns undefined when no key set', () => {
      const step = new CommandStep();
      expect(step.getKey()).toBeUndefined();
    });

    test('returns key when key set', () => {
      const step = new CommandStep().setKey('test-key');
      expect(step.getKey()).toBe('test-key');
    });
  });

  describe('getLabel', () => {
    test('returns undefined when no label set', () => {
      const step = new CommandStep();
      expect(step.getLabel()).toBeUndefined();
    });

    test('returns label when label set', () => {
      const step = new CommandStep().setLabel('Test Label');
      expect(step.getLabel()).toBe('Test Label');
    });
  });

  describe('getCondition', () => {
    test('returns undefined when no condition set', () => {
      const step = new CommandStep();
      expect(step.getCondition()).toBeUndefined();
    });

    test('returns condition when condition set', () => {
      const step = new CommandStep().setCondition('build.branch == "main"');
      expect(step.getCondition()).toBe('build.branch == "main"');
    });
  });

  describe('getBranches', () => {
    test('returns empty array when no branches added', () => {
      const step = new CommandStep();
      expect(step.getBranches()).toEqual([]);
    });

    test('returns branches when branches added', () => {
      const step = new CommandStep().addBranch('main').addBranch('develop');
      expect(step.getBranches()).toEqual(['main', 'develop']);
    });
  });

  describe('getDependencies', () => {
    test('returns empty array when no dependencies added', () => {
      const step = new CommandStep();
      expect(step.getDependencies()).toEqual([]);
    });

    test('returns dependencies when dependencies added', () => {
      const step = new CommandStep()
        .addDependency('step1')
        .addDependency({step: 'step2', allow_failure: true});
      expect(step.getDependencies()).toEqual([
        'step1',
        {step: 'step2', allow_failure: true},
      ]);
    });
  });

  describe('getSkip', () => {
    test('returns undefined when no skip set', () => {
      const step = new CommandStep();
      expect(step.getSkip()).toBeUndefined();
    });

    test('returns skip when skip set to boolean', () => {
      const step = new CommandStep().setSkip(true);
      expect(step.getSkip()).toBe(true);
    });

    test('returns skip when skip set to string', () => {
      const step = new CommandStep().setSkip('build.branch != "main"');
      expect(step.getSkip()).toBe('build.branch != "main"');
    });
  });

  describe('getPlugins', () => {
    test('returns empty array when no plugins added', () => {
      const step = new CommandStep();
      expect([...step.getPlugins()]).toEqual([]);
    });

    test('returns plugins when plugins added', () => {
      const plugin1 = {[dockerPlugin]: null};
      const plugin2 = new Plugin().setName('test-plugin');
      const step = new CommandStep().addPlugin(plugin1).addPlugin(plugin2);
      expect([...step.getPlugins()]).toEqual([plugin1, plugin2]);
    });
  });

  describe('getParallelism', () => {
    test('returns undefined when no parallelism set', () => {
      const step = new CommandStep();
      expect(step.getParallelism()).toBeUndefined();
    });

    test('returns parallelism when parallelism set', () => {
      const step = new CommandStep().setParallelism(3);
      expect(step.getParallelism()).toBe(3);
    });
  });

  describe('getEnv', () => {
    test('returns empty object when no env variables added', () => {
      const step = new CommandStep();
      expect(step.getEnv()).toEqual({});
    });

    test('returns env variables when env variables added', () => {
      const step = new CommandStep()
        .addEnv('NODE_ENV', 'production')
        .addEnv('DEBUG', 'true');
      expect(step.getEnv()).toEqual({
        NODE_ENV: 'production',
        DEBUG: 'true',
      });
    });
  });

  describe('getConcurrency', () => {
    test('returns undefined when no concurrency set', () => {
      const step = new CommandStep();
      expect(step.getConcurrency()).toBeUndefined();
    });

    test('returns concurrency when concurrency set', () => {
      const step = new CommandStep().setConcurrency('deploy', 1);
      expect(step.getConcurrency()).toBe(1);
    });
  });

  describe('getSoftFail', () => {
    test('returns undefined when no soft fail set', () => {
      const step = new CommandStep();
      expect(step.getSoftFail()).toBeUndefined();
    });

    test('returns soft fail when soft fail set', () => {
      const step = new CommandStep().setSoftFail(true);
      expect(step.getSoftFail()).toBe(true);
    });
  });

  describe('getTimeout', () => {
    test('returns undefined when no timeout set', () => {
      const step = new CommandStep();
      expect(step.getTimeout()).toBeUndefined();
    });

    test('returns timeout when timeout set', () => {
      const step = new CommandStep().setTimeout(30);
      expect(step.getTimeout()).toBe(30);
    });
  });

  describe('getAgents', () => {
    test('returns empty object when no agents added', () => {
      const step = new CommandStep();
      expect(step.getAgents()).toEqual({});
    });

    test('returns agents when agents added', () => {
      const step = new CommandStep()
        .addAgent('queue', 'default')
        .addAgent('os', 'linux');
      expect(step.getAgents()).toEqual({
        queue: 'default',
        os: 'linux',
      });
    });
  });

  describe('getManualRetry', () => {
    test('returns undefined when no manual retry set', () => {
      const step = new CommandStep();
      expect(step.getManualRetry()).toBeUndefined();
    });

    test('returns manual retry when manual retry set to boolean', () => {
      const step = new CommandStep().setManualRetry(true);
      expect(step.getManualRetry()).toBe(true);
    });

    test('returns manual retry when manual retry set to object', () => {
      const retryConfig = {
        permit_on_passed: false,
        reason: 'Cannot retry successful deployment',
      };
      const step = new CommandStep().setManualRetry(retryConfig);
      expect(step.getManualRetry()).toEqual(retryConfig);
    });
  });

  describe('getAutomaticRetries', () => {
    test('returns empty array when no automatic retries added', () => {
      const step = new CommandStep();
      expect(step.getAutomaticRetries()).toEqual([]);
    });

    test('returns automatic retries when automatic retries added', () => {
      const retry1 = {exit_status: 139, limit: 1};
      const retry2 = {exit_status: '*' as const, limit: 2};
      const step = new CommandStep()
        .addAutomaticRetry(retry1)
        .addAutomaticRetry(retry2);
      expect(step.getAutomaticRetries()).toEqual([retry1, retry2]);
    });
  });
});
