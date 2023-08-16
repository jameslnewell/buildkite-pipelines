import {DockerECRCachePlugin} from './DockerECRCachePlugin';

describe(DockerECRCachePlugin.name, () => {
  test('nested under name/version', () => {
    const plugin = new DockerECRCachePlugin();
    expect(plugin.build()).toHaveProperty(
      DockerECRCachePlugin.PLUGIN,
      expect.objectContaining({}),
    );
  });

  describe('.cacheOn()', () => {
    test('is not defined when not specified', () => {
      const plugin = new DockerECRCachePlugin();
      expect(plugin.build()[DockerECRCachePlugin.PLUGIN]).not.toHaveProperty(
        'cache-on',
      );
    });
    test('is an array when specified', () => {
      const glob = 'package.json';
      const plugin = new DockerECRCachePlugin().cacheOn(glob);
      expect(plugin.build()[DockerECRCachePlugin.PLUGIN]).toHaveProperty(
        'cache-on',
        [glob],
      );
    });
  });

  describe('.secret()', () => {
    test('is not defined when not specified', () => {
      const plugin = new DockerECRCachePlugin();
      expect(plugin.build()[DockerECRCachePlugin.PLUGIN]).not.toHaveProperty(
        'secrets',
      );
    });
    test('is an array when specified', () => {
      const secret = 'id=npmrc,src=.npmrc';
      const plugin = new DockerECRCachePlugin().secret(secret);
      expect(plugin.build()[DockerECRCachePlugin.PLUGIN]).toHaveProperty(
        'secrets',
        [secret],
      );
    });
  });

  describe('.buildArg()', () => {
    test('is not defined when not specified', () => {
      const plugin = new DockerECRCachePlugin();
      expect(plugin.build()[DockerECRCachePlugin.PLUGIN]).not.toHaveProperty(
        'build-args',
      );
    });
    test('is an array when specified', () => {
      const buildArg = 'VERSION=123';
      const plugin = new DockerECRCachePlugin().buildArg(buildArg);
      expect(plugin.build()[DockerECRCachePlugin.PLUGIN]).toHaveProperty(
        'build-args',
        [buildArg],
      );
    });
  });
});
