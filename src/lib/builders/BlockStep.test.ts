import { Field } from '../schema';
import { BlockStep } from './BlockStep';

describe(BlockStep.name, () => {
  const label = 'Release';

  test('has label', async () => {
    const step = new BlockStep().setLabel(label);
    expect((await step.build()).block).toEqual(label);
  });

  test('has state', async () => {
    const state = 'running';
    const step = new BlockStep().setLabel(label).state(state);
    expect((await step.build()).blocked_state).toEqual(state);
  });

  test('has branch', async () => {
    const branch = 'main';
    const step = new BlockStep().setLabel(label).branch(branch);
    expect((await step.build()).branches).toContain(branch);
  });

  test('has key', async () => {
    const key = 'main';
    const step = new BlockStep().setLabel(label).setKey(key);
    expect((await step.build()).key).toEqual(key);
  });

  test('has dependencies', async () => {
    const key = 'unit-tests';
    const step = new BlockStep().setLabel(label).dependOn(key);
    expect((await step.build()).depends_on).toContain(key);
  });

  test('has prompt', async () => {
    const prompt = 'Fill out the details for this release';
    const step = new BlockStep().setLabel(label).prompt(prompt);
    expect((await step.build()).prompt).toEqual(prompt);
  });

  test('has field', async () => {
    const field: Field = {
      text: 'ReleaseName',
      key: 'release-name',
    };
    const step = new BlockStep().setLabel(label).field(field);
    expect((await step.build()).fields).toContain(field);
  });
});
