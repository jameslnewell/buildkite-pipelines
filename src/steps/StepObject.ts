import { BlockStepObject } from './BlockStepObject'
import {CommandStepObject} from './CommandStepObject'
import { WaitStepObject } from './WaitStepObject'
import { InputStepObject } from './InputStepObject'
import { TriggerStepObject } from './TriggerStepObject'

export type StepObject = BlockStepObject | CommandStepObject | InputStepObject | TriggerStepObject | WaitStepObject