import {CommandStep, PluginBuilder, PluginSchema} from '../lib';

export interface FindPluginsPredicate {
  (
    plugin: PluginSchema | PluginBuilder,
    index: number,
    plugins: Array<PluginSchema | PluginBuilder>,
  ): boolean;
}

export interface FindPluginsOptions {}

/**
 * Find plugins that match the predicate within a step
 */
export function findPlugins(
  stepOrPlugins: CommandStep | Iterable<PluginSchema | PluginBuilder>,
  predicate: FindPluginsPredicate,
  _options: FindPluginsOptions = {},
): ReadonlyArray<PluginSchema | PluginBuilder> {
  // if we have a step, get the plugins from the step, otherwise get the plugins from the iterable
  const stepsArray = Array.from(
    stepOrPlugins instanceof CommandStep
      ? stepOrPlugins.getPlugins()
      : stepOrPlugins,
  );

  // filter the steps based on the predicate
  const filteredPluginsArray = stepsArray.filter((plugin, index, plugins) =>
    predicate(plugin, index, plugins),
  );

  return filteredPluginsArray;
}
