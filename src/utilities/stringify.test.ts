import {stringify} from './stringify';

describe('stringify()', () => {
  test('outputs a yaml string', () => {
    const result = stringify({
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
