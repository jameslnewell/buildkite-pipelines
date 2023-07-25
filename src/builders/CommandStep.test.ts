import { CommandStep } from "./CommandStep";
import { Plugin } from "./Plugin";

const installCommand = "yarn install";
const buildCommand = "yarn run build";
const dockerPlugin = "docker#v3.11.0";

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
  describe("command", () => {
    test("string when string", () => {
      const step = new CommandStep().command(installCommand).build();
      expect(step).toHaveProperty("command", installCommand);
    });
    test("array when array length == 1", () => {
      const step = new CommandStep().command([installCommand]).build();
      expect(step).toHaveProperty("command", [installCommand]);
    });
    test("array when array length > 1", () => {
      const step = new CommandStep()
        .command([installCommand, buildCommand])
        .build();
      expect(step).toHaveProperty("commands", [installCommand, buildCommand]);
    });
  });

  // describe("env", () => {
  //   test("undefined when undefined", () => {
  //     const step = new CommandStep().build();
  //     expect(step).not.toHaveProperty("env");
  //   });
  //   test("defined when object", () => {
  //     const step = new CommandStep()
  //       .env({
  //         FOO: "bar",
  //       })
  //       .build();
  //     expect(step).toHaveProperty("env.FOO", "bar");
  //   });
  // });

  describe("plugins", () => {
    test("undefined when not defined", () => {
      const step = new CommandStep().command(':');
      expect(step.build()).not.toHaveProperty("plugins");
    });
    test("defined when object", () => {
      const step = new CommandStep().command(':').plugin({ [dockerPlugin]: null });
      expect(step.build()).toHaveProperty("plugins.0", {
        [dockerPlugin]: null,
      });
    });
    test("defined when builder", () => {
      const step = new CommandStep().command(':').plugin(new Plugin(dockerPlugin));
      expect(step.build()).toHaveProperty("plugins.0", {
        [dockerPlugin]: null,
      });
    });
  });

  describe("parallelism", () => {
    test("undefined by default", () => {
      const step = new CommandStep().command(':').build();
      expect(step).not.toHaveProperty("parallelism");
    });
    test("defined when 3", () => {
      const step = new CommandStep().command(':').parallelism(3).build();
      expect(step).toHaveProperty("parallelism", 3);
    });
  });

  describe("skip", () => {
    test("undefined by default", () => {
      const step = new CommandStep().command(':').command(':').build();
      expect(step).not.toHaveProperty("skip");
    });
    test("defined when true", () => {
      const step = new CommandStep().command(':').skip(true).build();
      expect(step).toHaveProperty("skip", true);
    });
    test("defined when false", () => {
      const step = new CommandStep().command(':').skip(false).build();
      expect(step).toHaveProperty("skip", false);
    });
  });
});
