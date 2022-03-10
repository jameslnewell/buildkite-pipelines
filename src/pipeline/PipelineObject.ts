import { StepObject } from "./steps/StepObject";

export interface PipelineObject {
  steps: StepObject[]

  notify?: {
    github_commit_status: {
      context: string
    }
  }

}