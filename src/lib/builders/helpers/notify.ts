import {PipelineNotify} from '../../schema';

export interface NotifyBuilder {
  notify(notify: PipelineNotify): this;
}

export class NotifyHelper {
  #notify: Array<PipelineNotify> = [];

  /**
   * @see https://buildkite.com/docs/pipelines/notifications
   */
  notify(notify: PipelineNotify): void {
    this.#notify.push(notify);
  }

  build() {
    return this.#notify.length > 0 ? {notify: this.#notify} : {};
  }
}
