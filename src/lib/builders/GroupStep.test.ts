import {CommandStep} from './CommandStep';
import {GroupStep} from './GroupStep';

describe(GroupStep.name, () => {
  const label = 'Testing Steps';

  const command = new CommandStep().command('yarn run test');
  const group = new GroupStep().label(label).step(command);
  const object = group.build();

  test('has label key', () => {
    expect(object).toHaveProperty('label', label);
  });

  test('has group key', () => {
    expect(object).toHaveProperty('group', label);
  });

  test('has steps', () => {
    expect(object).toHaveProperty(
      'steps',
      expect.arrayContaining([command.build()]),
    );
  });
});
