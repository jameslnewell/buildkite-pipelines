import {PipelineNotification} from '../../schema';

export interface NotifyBuilder {
  notify(notify: PipelineNotification): this;
  addNotification(notification: PipelineNotification): this;
}

export class NotificationHelper {
  #notifications: Array<PipelineNotification> = [];

  /**
   * @see https://buildkite.com/docs/pipelines/notifications
   */
  addNotification(notification: PipelineNotification): void {
    this.#notifications.push(notification);
  }

  build() {
    return this.#notifications.length > 0 ? {notify: this.#notifications} : {};
  }
}
