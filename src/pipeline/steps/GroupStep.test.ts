import { CommandStep } from "./CommandStep";
import { GroupStep } from "./GroupStep";

describe(GroupStep.name, () => {
  const groupLabel = "Testing";

  const command = CommandStep.builder().command("yarn run test");
  const group = GroupStep.builder().label(groupLabel).steps([command]);
  const object = group.build();

  test("has label", () => {
    expect(object).toHaveProperty("label", groupLabel);
  });

  test("has steps", () => {
    expect(object).toHaveProperty(
      "steps",
      expect.arrayContaining([command.build()])
    );
  });
});
