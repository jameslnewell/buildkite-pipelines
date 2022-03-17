import { CommandStep } from "./CommandStep";
import { Plugin } from "./plugins/Plugin";

const installCommand = "yarn install";
const buildCommand = "yarn run build";
const dockerPlugin = "docker#v3.11.0";

const step = new CommandStep(installCommand)
  .key('i-am-awesome')
  .label(':yarn: install')
  .command(installCommand)
  .env({GITHUB_TOKEN: 'ghp_xxx'})
  .plugins([])

describe(CommandStep.name, () => {
  describe("command", () => {
    test("string when string", () => {
      const step = new CommandStep(installCommand);
      expect(step.build()).toHaveProperty("command", installCommand);
    });
    test("array when array length == 1", () => {
      const step = new CommandStep([installCommand]);
      expect(step.build()).toHaveProperty("command", installCommand);
    });
    test("array when array length > 1", () => {
      const step = new CommandStep([installCommand, buildCommand]);
      expect(step.build()).toHaveProperty("commands", [
        installCommand,
        buildCommand,
      ]);
    });
    test("throws when empty array", () => {
      const step = new CommandStep([]);
      expect(() => step.build()).toThrowError('Invalid command');
    });
  });

  describe('env', () => {
    test('undefined when not defined', () => {
      const step = new CommandStep(installCommand);
      expect(step.build()).not.toHaveProperty("env");
    })
    test('undefined when object', () => {
      const step = new CommandStep(installCommand, {env: {
        FOO: 'bar'
      }});
      expect(step.build()).toHaveProperty("env.FOO", "bar");
    })
  })

  describe("plugins", () => {
    test("undefined when not defined", () => {
      const step = new CommandStep(installCommand);
      expect(step.build()).not.toHaveProperty("plugins");
    });
    test("defined when object", () => {
      const step = new CommandStep(installCommand);
      step.plugins([{ [dockerPlugin]: null }]);
      expect(step.build()).toHaveProperty("plugins.0", {
        [dockerPlugin]: null,
      });
    });
    test("defined when builder", () => {
      const step = new CommandStep(installCommand);
      step.plugins([new Plugin(dockerPlugin)]);
      expect(step.build()).toHaveProperty("plugins.0", {
        [dockerPlugin]: null,
      });
    });
  });
});
