import { Plugin } from "./Plugin";
import { PluginBuilder } from "./PluginBuilder";

export class DockerPlugin implements PluginBuilder {
  #plugin: Plugin;
  #image?: string;

  constructor() {
    this.#plugin = new Plugin('docker#v3.10.0', {})
  }

  build() {
    return this.#plugin.build()
  }
}