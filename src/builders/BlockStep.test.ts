import {BlockStep} from './BlockStep'
import { TextInput } from './partials'

describe(BlockStep.name, () => {
  const label = 'Release'

  test('has label', () => {
    const step = new BlockStep().label(label)
    expect(step.build().block).toEqual(label)
  })

  test('has state', () => {
    const state = 'running'
    const step = new BlockStep().label(label).state(state)
    expect(step.build().blocked_state).toEqual(state)
  })

  test('has branch', () => {
    const branch = 'main'
    const step = new BlockStep().label(label).branch(branch)
    expect(step.build().branches).toContain(branch)
  })

  test('has key', () => {
    const key = 'main'
    const step = new BlockStep().label(label).key(key)
    expect(step.build().key).toEqual(key)
  })

  test('has dependencies', () => {
    const key = 'unit-tests'
    const step = new BlockStep().label(label).dependOn(key)
    expect(step.build().depends_on).toContain(key)
  })

  test('has prompt', () => {
    const prompt = 'Fill out the details for this release'
    const step = new BlockStep().label(label).prompt(prompt)
    expect(step.build().prompt).toEqual(prompt)
  })

  test('has field', () => {
    const field: TextInput = {
      text: 'ReleaseName',
      key: 'release-name',
    }
    const step = new BlockStep().label(label).field(field)
    expect(step.build().fields).toContain(field)
  })

})
