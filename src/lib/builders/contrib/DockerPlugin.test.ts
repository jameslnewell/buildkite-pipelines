import {DockerPlugin} from './DockerPlugin';

describe(DockerPlugin.name, () => {
  test('nested under name/version', () => {
    const plugin = new DockerPlugin();
    expect(plugin.build()).toHaveProperty(
      DockerPlugin.PLUGIN,
      expect.objectContaining({}),
    );
  });

  describe('.command()', () => {
    test('is not defined when not specified', () => {
      const plugin = new DockerPlugin();
      expect(plugin.build()[DockerPlugin.PLUGIN]).not.toHaveProperty('command');
    });
    test('is an array when specified', () => {
      const command = 'echo "Hello World!"';
      const plugin = new DockerPlugin().command(command);
      expect(plugin.build()[DockerPlugin.PLUGIN]).toHaveProperty('command', [
        command,
      ]);
    });
  });

  describe('.environment()', () => {
    test('is not defined when not specified', () => {
      const plugin = new DockerPlugin();
      expect(plugin.build()[DockerPlugin.PLUGIN]).not.toHaveProperty(
        'environment',
      );
    });
    test('is an array when specified', () => {
      const envvar = 'SWITCH=ON';
      const plugin = new DockerPlugin().environment(envvar);
      expect(plugin.build()[DockerPlugin.PLUGIN]).toHaveProperty(
        'environment',
        [envvar],
      );
    });
  });

  describe('.volume()', () => {
    test('is not defined when not specified', () => {
      const plugin = new DockerPlugin();
      expect(plugin.build()[DockerPlugin.PLUGIN]).not.toHaveProperty('volumes');
    });
    test('is an array when specified', () => {
      const volume = '${PWD}:/workdir';
      const plugin = new DockerPlugin().volume(volume);
      expect(plugin.build()[DockerPlugin.PLUGIN]).toHaveProperty('volumes', [
        volume,
      ]);
    });
  });
});
