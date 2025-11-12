import {ArtifactsPlugin} from './ArtifactsPlugin';

describe(ArtifactsPlugin.name, () => {
  test('nested under name/version', async () => {
    const plugin = new ArtifactsPlugin();
    expect(await plugin.build()).toHaveProperty(
      ArtifactsPlugin.PLUGIN,
      expect.objectContaining({}),
    );
  });

  describe('.addDownload()', () => {
    test('is not defined when download not specified', async () => {
      const plugin = new ArtifactsPlugin();
      expect((await plugin.build())[ArtifactsPlugin.PLUGIN]).not.toHaveProperty(
        'download',
      );
    });
    test('is a string when a single download is specified', async () => {
      const glob = '*.log';
      const plugin = new ArtifactsPlugin().addDownload(glob);
      expect((await plugin.build())[ArtifactsPlugin.PLUGIN]).toHaveProperty(
        'download',
        glob,
      );
    });
    test('is an array when more than one download is specified', async () => {
      const glob1 = '*.log';
      const glob2 = '*.txt';
      const plugin = new ArtifactsPlugin()
        .addDownload(glob1)
        .addDownload(glob2);
      expect((await plugin.build())[ArtifactsPlugin.PLUGIN]).toHaveProperty(
        'download',
        [glob1, glob2],
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
    test('is a string when a single upload is specified', async () => {
      const glob = '*.log';
      const plugin = new ArtifactsPlugin().addUpload(glob);
      expect((await plugin.build())[ArtifactsPlugin.PLUGIN]).toHaveProperty(
        'upload',
        glob,
      );
    });
    test('is an array when more than one upload is specified', async () => {
      const glob1 = '*.log';
      const glob2 = '*.txt';
      const plugin = new ArtifactsPlugin().addUpload(glob1).addUpload(glob2);
      expect((await plugin.build())[ArtifactsPlugin.PLUGIN]).toHaveProperty(
        'upload',
        [glob1, glob2],
      );
    });
  });
});
