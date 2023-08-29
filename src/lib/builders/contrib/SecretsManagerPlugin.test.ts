import {SecretsManagerPlugin} from './SecretsManagerPlugin';

describe(SecretsManagerPlugin.name, () => {
  test('nested under name/version', async () => {
    const plugin = new SecretsManagerPlugin();
    expect(await plugin.build()).toHaveProperty(
      SecretsManagerPlugin.PLUGIN,
      expect.objectContaining({}),
    );
  });

  describe('.env()', () => {
    test('is not defined when not specified', async () => {
      const plugin = new SecretsManagerPlugin();
      expect(
        (await plugin.build())[SecretsManagerPlugin.PLUGIN],
      ).not.toHaveProperty('env');
    });
    test('is an array when specified', async () => {
      const secretId = 'test';
      const plugin = new SecretsManagerPlugin().env('TEST', 'test');
      expect(
        (await plugin.build())[SecretsManagerPlugin.PLUGIN],
      ).toHaveProperty('env', {TEST: secretId});
    });
  });

  describe('.file()', () => {
    test('is not defined when not specified', async () => {
      const plugin = new SecretsManagerPlugin();
      expect(
        (await plugin.build())[SecretsManagerPlugin.PLUGIN],
      ).not.toHaveProperty('file');
    });
    test('is an array when specified', async () => {
      const name = 'secret.txt';
      const secretId = 'test';
      const plugin = new SecretsManagerPlugin().file(name, secretId);
      expect(
        (await plugin.build())[SecretsManagerPlugin.PLUGIN],
      ).toHaveProperty(
        'file',
        expect.arrayContaining([{path: name, 'secret-id': secretId}]),
      );
    });
  });
});
