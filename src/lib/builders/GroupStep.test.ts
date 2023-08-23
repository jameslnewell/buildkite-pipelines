import {CommandStep} from './CommandStep';
import {GroupStep} from './GroupStep';

describe(GroupStep.name, () => {
  const label = 'Testing Steps';
  const command = new CommandStep().command('yarn run test');

  test('has label key', async () => {
    const group = new GroupStep().label(label).step(command);
    const object = await group.build();
    expect(object).toHaveProperty('label', label);
  });

  test('has group key', async () => {
    const group = new GroupStep().label(label).step(command);
    const object = await group.build();
    expect(object).toHaveProperty('group', label);
  });

  test('has steps', async () => {
    const group = new GroupStep().label(label).step(command);
    const object = await group.build();
    expect(object).toHaveProperty(
      'steps',
      expect.arrayContaining([await command.build()]),
    );
  });
});
