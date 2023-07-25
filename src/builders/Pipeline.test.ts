import { Pipeline } from "./Pipeline";
import { CommandStep } from "./CommandStep";

describe("Pipeline", () => {
  test("has steps", () => {

    const step1 = new CommandStep().command('echo "hello"')
    const step2 = new CommandStep().command('echo "world"')

    const pipeline = new Pipeline()
      .step(step1)
      .step(step2)
      .build()

    expect(pipeline).toHaveProperty(
      "steps",
      expect.arrayContaining([
        expect.objectContaining(step1.build()),
        expect.objectContaining(step1.build()),
      ])
    );
  });

});
