import {ECRPlugin} from './ECRPlugin';

describe(ECRPlugin.name, () => {
  test('nested under name/version', async () => {
    const plugin = new ECRPlugin();
    expect(await plugin.build()).toHaveProperty(
      ECRPlugin.PLUGIN,
      expect.objectContaining({}),
    );
  });

  describe('.account()', () => {
    test('is not defined when not specified', async () => {
      const plugin = new ECRPlugin();
      expect((await plugin.build())[ECRPlugin.PLUGIN]).not.toHaveProperty(
        'account-ids',
      );
    });
    test('is an array when specified', async () => {
      const account = '12345678';
      const plugin = new ECRPlugin().account(account);
      expect((await plugin.build())[ECRPlugin.PLUGIN]).toHaveProperty(
        'account-ids',
        [account],
      );
    });
  });
});
