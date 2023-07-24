import { ConditionBuilder } from "./conition"

export interface NotifyBuilder {
  notify?: {
    basecamp_campfire?: string
    email?: string
    pagerduty_change_event?: string
    slack?: string | {
      channels?: string[]
      message?: string
    }
    webhook?: string
  }
}

class Notify implements ConditionBuilder {
  email(email: string): this {

  }

  slack(channel: string): this {

  }

  condition(condition: string): this {
  
  }
}

Pipeline.notification()

new Notify().email('x')

