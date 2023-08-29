import {ArtifactsPlugin} from './ArtifactsPlugin';

describe(ArtifactsPlugin.name, () => {
  test('nested under name/version', async () => {
    const plugin = new ArtifactsPlugin();
    expect(await plugin.build()).toHaveProperty(
      ArtifactsPlugin.PLUGIN,
      expect.objectContaining({}),
    );
  });

  describe('.download()', () => {
    test('is not defined when not specified', async () => {
      const plugin = new ArtifactsPlugin();
      expect((await plugin.build())[ArtifactsPlugin.PLUGIN]).not.toHaveProperty(
        'download',
      );
    });
    test('is an array when specified', async () => {
      const glob = '*.log';
      const plugin = new ArtifactsPlugin().download(glob);
      expect((await plugin.build())[ArtifactsPlugin.PLUGIN]).toHaveProperty(
        'download',
        [glob],
      );
    });
  });
  describe('.upload()', () => {
    test('is not defined when not specified', async () => {
      const plugin = new ArtifactsPlugin();
      expect((await plugin.build())[ArtifactsPlugin.PLUGIN]).not.toHaveProperty(
        'upload',
      );
    });
    test('is an array when specified', async () => {
      const glob = '*.log';
      const plugin = new ArtifactsPlugin().upload(glob);
      expect((await plugin.build())[ArtifactsPlugin.PLUGIN]).toHaveProperty(
        'upload',
        [glob],
      );
    });
  });
});
