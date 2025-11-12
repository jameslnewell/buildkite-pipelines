import {stringify} from './stringify';

describe('stringify()', () => {
  test('outputs a yaml string', async () => {
    const result = await stringify({
      steps: [
        {
          label: 'lint',
          command: 'yarn run lint',
        },
      ],
    });
    expect(result).toMatchSnapshot();
  });
});
