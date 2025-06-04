import {ArtifactsPlugin, CommandStep, DockerPlugin} from '../lib';
import {findFirstPlugin, findPlugins} from './findPlugins';

const dockerPlugin = new DockerPlugin()
  .setImage('node:22')
  .addCommand('node -e console.log("Hello World")');

const step = new CommandStep().addPlugin(dockerPlugin);

describe(findPlugins, () => {
  test('finds plugins which match the predicate', () => {
    const plugins = findPlugins(step, (plugin) => {
      return plugin instanceof DockerPlugin;
    });

    expect(plugins).toEqual([dockerPlugin]);
  });

  test('does not find plugins which do not match the predicate', () => {
    const plugins = findPlugins(step, (plugin) => {
      return plugin instanceof ArtifactsPlugin;
    });

    expect(plugins).toEqual([]);
  });
});

describe(findFirstPlugin, () => {
  test('finds the first plugin which matches the predicate', () => {
    const plugin = findFirstPlugin(step, (plugin) => {
      return plugin instanceof DockerPlugin;
    });
    expect(plugin).toEqual(dockerPlugin);
  });

  test('does not find plugins which do not match the predicate', () => {
    const plugin = findFirstPlugin(step, (plugin) => {
      return plugin instanceof ArtifactsPlugin;
    });

    expect(plugin).toBeUndefined();
  });
});
