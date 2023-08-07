import {SecretsManagerPlugin} from './SecretsManagerPlugin';

describe(SecretsManagerPlugin.name, () => {
  test('nested under name/version', () => {
    const plugin = new SecretsManagerPlugin();
    expect(plugin.build()).toHaveProperty(
      SecretsManagerPlugin.PLUGIN,
      expect.objectContaining({}),
    );
  });

  describe('.env()', () => {
    test('is not defined when not specified', () => {
      const plugin = new SecretsManagerPlugin();
      expect(plugin.build()[SecretsManagerPlugin.PLUGIN]).not.toHaveProperty(
        'env',
      );
    });
    test('is an array when specified', () => {
      const secretId = 'test';
      const plugin = new SecretsManagerPlugin().env('TEST', 'test');
      expect(plugin.build()[SecretsManagerPlugin.PLUGIN]).toHaveProperty(
        'env',
        {TEST: secretId},
      );
    });
  });

  describe('.file()', () => {
    test('is not defined when not specified', () => {
      const plugin = new SecretsManagerPlugin();
      expect(plugin.build()[SecretsManagerPlugin.PLUGIN]).not.toHaveProperty(
        'file',
      );
    });
    test('is an array when specified', () => {
      const name = 'secret.txt';
      const secretId = 'test';
      const plugin = new SecretsManagerPlugin().file(name, secretId);
      expect(plugin.build()[SecretsManagerPlugin.PLUGIN]).toHaveProperty(
        'file',
        expect.arrayContaining([{path: name, 'secret-id': secretId}]),
      );
    });
  });
});
