import {CommandStep} from './CommandStep';
import {GroupStep} from './GroupStep';

describe(GroupStep.name, () => {
  const label = 'Testing Steps';
  const step = new CommandStep().command('yarn run test');

  test('has label key', async () => {
    const group = new GroupStep().setLabel(label).addStep(step);
    const object = await group.build();
    expect(object).toHaveProperty('label', label);
  });

  test('has group key', async () => {
    const group = new GroupStep().setLabel(label).addStep(step);
    const object = await group.build();
    expect(object).toHaveProperty('group', label);
  });

  test('has steps added various different ways', async () => {
    const checkStep = new CommandStep().command('yarn run check');
    const buildStep = new CommandStep().command('yarn run build');
    const testStep = new CommandStep().command('yarn run test');

    const group = new GroupStep()
      .setLabel(label)
      .steps([checkStep, buildStep])
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
