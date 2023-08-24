import {validate} from './validate';

describe(validate.name, () => {
  test('returns 0 errors when valid', async () => {
    const errors = await validate({
      steps: [],
    });
    expect(errors);
  });

  test('returns >0 errors when invalid', async () => {
    const errors = await validate({
      steps: [{foo: 'bar'} as any],
    });
    expect(errors.length).toBeGreaterThan(0);
  });

  test('returns structured errors when invalid', async () => {
    const errors = await validate({
      steps: [{command: 'echo "Hello World!"', timeout_in_minutes: 0}],
    });
    expect(errors).toContainEqual(
      expect.objectContaining({
        message: 'must be >= 1',
      }),
    );
  });
});
