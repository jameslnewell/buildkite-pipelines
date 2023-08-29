import { DockerPlugin } from './DockerPlugin';

describe(DockerPlugin.name, () => {
  test('nested under name/version', async () => {
    const plugin = new DockerPlugin();
    expect(await plugin.build()).toHaveProperty(
      DockerPlugin.PLUGIN,
      expect.objectContaining({}),
    );
  });

  describe('.addCommand()', () => {
    test('is not defined when not specified', async () => {
      const plugin = new DockerPlugin();
      expect(
        (await await plugin.build())[DockerPlugin.PLUGIN],
      ).not.toHaveProperty('command');
    });
    test('is an array when specified', async () => {
      const command = 'echo "Hello World!"';
      const plugin = new DockerPlugin().addCommand(command);
      expect((await plugin.build())[DockerPlugin.PLUGIN]).toHaveProperty(
        'command',
        [command],
      );
    });
  });

  describe('.environment()', () => {
    test('is not defined when not specified', async () => {
      const plugin = new DockerPlugin();
      expect((await plugin.build())[DockerPlugin.PLUGIN]).not.toHaveProperty(
        'environment',
      );
    });
    test('is an array when specified', async () => {
      const envvar = 'SWITCH=ON';
      const plugin = new DockerPlugin().environment(envvar);
      expect((await plugin.build())[DockerPlugin.PLUGIN]).toHaveProperty(
        'environment',
        [envvar],
      );
    });
  });

  describe('.addVolume()', () => {
    test('is not defined when not specified', async () => {
      const plugin = new DockerPlugin();
      expect((await plugin.build())[DockerPlugin.PLUGIN]).not.toHaveProperty(
        'volumes',
      );
    });
    test('is an array when specified', async () => {
      const volume = '${PWD}:/workdir';
      const plugin = new DockerPlugin().addVolume(volume);
      expect((await plugin.build())[DockerPlugin.PLUGIN]).toHaveProperty(
        'volumes',
        [volume],
      );
    });
  });
});
