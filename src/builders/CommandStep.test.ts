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

  describe("env", () => {
    test("undefined when undefined", () => {
      const step = new CommandStep().command(":").build();
      expect(step).not.toHaveProperty("env");
    });
    test("defined when object", () => {
      const step = new CommandStep()
        .command(":")
        .env({
          FOO: "bar",
        })
        .build();
      expect(step).toHaveProperty("env.FOO", "bar");
    });
  });

  describe("plugins", () => {
    test("undefined when not defined", () => {
      const step = new CommandStep().command(":");
      expect(step.build()).not.toHaveProperty("plugins");
    });
    test("defined when object", () => {
      const step = new CommandStep()
        .command(":")
        .plugin({ [dockerPlugin]: null });
      expect(step.build()).toHaveProperty("plugins.0", {
        [dockerPlugin]: null,
      });
    });
    test("defined when builder", () => {
      const step = new CommandStep()
        .command(":")
        .plugin(new Plugin(dockerPlugin));
      expect(step.build()).toHaveProperty("plugins.0", {
        [dockerPlugin]: null,
      });
    });
  });

  describe("parallelism", () => {
    test("undefined by default", () => {
      const step = new CommandStep().command(":").build();
      expect(step).not.toHaveProperty("parallelism");
    });
    test("defined when 3", () => {
      const step = new CommandStep().command(":").parallelism(3).build();
      expect(step).toHaveProperty("parallelism", 3);
    });
  });

  describe("skip", () => {
    test("undefined by default", () => {
      const step = new CommandStep().command(":").build();
      expect(step).not.toHaveProperty("skip");
    });
    test("defined when true", () => {
      const step = new CommandStep().command(":").skip(true).build();
      expect(step).toHaveProperty("skip", true);
    });
    test("defined when false", () => {
      const step = new CommandStep().command(":").skip(false).build();
      expect(step).toHaveProperty("skip", false);
    });
  });

  describe("concurrency", () => {
    test("undefined by default", () => {
      const step = new CommandStep().command(":").build();
      expect(step).not.toHaveProperty("concurrency");
    });
    test("defined when 1", () => {
      const step = new CommandStep().command(":").concurrency(1).build();
      expect(step).toHaveProperty("concurrency", 1);
    });
  });

  describe("concurrency_group", () => {
    test("undefined by default", () => {
      const step = new CommandStep().command(":").build();
      expect(step).not.toHaveProperty("concurrency_group");
    });
    test("defined when 1", () => {
      const step = new CommandStep()
        .command(":")
        .concurrency(1, "test")
        .build();
      expect(step).toHaveProperty("concurrency_group", "test");
    });
  });

  describe("soft_fail", () => {
    test("undefined by default", () => {
      const step = new CommandStep().command(":").build();
      expect(step).not.toHaveProperty("soft_fail");
    });

    test("defined when true", () => {
      const step = new CommandStep()
        .command(":")
        .softFail()
        .build();
      expect(step).toHaveProperty("soft_fail", true);
    });
  });

  describe("timeout_in_minutes", () => {
    test("undefined by default", () => {
      const step = new CommandStep().command(":").build();
      expect(step).not.toHaveProperty("timeout_in_minutes");
    });

    test("defined when 2", () => {
      const step = new CommandStep()
        .command(":")
        .timeout(2)
        .build();
      expect(step).toHaveProperty("timeout_in_minutes", 2);
    });
  });

  describe("artifact_paths", () => {
    test("undefined by default", () => {
      const step = new CommandStep().command(":").build();
      expect(step).not.toHaveProperty("artifact_paths");
    });

    test("defined when one path set", () => {
      const step = new CommandStep()
        .command(":")
        .artifactPath('./foo')
        .build();
      expect(step).toHaveProperty("artifact_paths", ['./foo']);
    });

    test("defined when ultiple path set", () => {
      const step = new CommandStep()
        .command(":")
        .artifactPath('./foo')
        .artifactPath('./bar')
        .build();
      expect(step).toHaveProperty("artifact_paths", ['./foo', './bar']);
    });
  });

});
