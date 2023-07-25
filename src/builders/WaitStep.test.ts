import { WaitStep } from "./WaitStep";

describe(WaitStep.name, () => {
  describe(".wait", () => {
    const wait = new WaitStep();
    expect(wait.build()).toHaveProperty("wait", null);
  });
  describe(".continue_on_failure", () => {
    test("defaults to undefined", () => {
      expect(new WaitStep().build()).toHaveProperty(
        "continue_on_failure",
        undefined
      );
    });
    test("set to true when set on the object", () => {
      expect(new WaitStep().continueOnFailure(true).build()).toHaveProperty(
        "continue_on_failure",
        true
      );
    });
    test("set to false when set on the object", () => {
      expect(
        new WaitStep().continueOnFailure(false).build()
      ).toHaveProperty("continue_on_failure", false);
    });
  });
});
