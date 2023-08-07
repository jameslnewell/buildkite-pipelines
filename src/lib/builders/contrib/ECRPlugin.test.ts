import {ECRPlugin} from './ECRPlugin';

describe(ECRPlugin.name, () => {
  test('nested under name/version', () => {
    const plugin = new ECRPlugin();
    expect(plugin.build()).toHaveProperty(
      ECRPlugin.PLUGIN,
      expect.objectContaining({}),
    );
  });

  describe('.account()', () => {
    test('is not defined when not specified', () => {
      const plugin = new ECRPlugin();
      expect(plugin.build()[ECRPlugin.PLUGIN]).not.toHaveProperty(
        'account-ids',
      );
    });
    test('is an array when specified', () => {
      const account = '12345678';
      const plugin = new ECRPlugin().account(account);
      expect(plugin.build()[ECRPlugin.PLUGIN]).toHaveProperty('account-ids', [
        account,
      ]);
    });
  });
});
