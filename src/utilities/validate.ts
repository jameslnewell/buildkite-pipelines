
import Ajv, { ErrorObject } from 'ajv'
import { PipelineSchema } from "../schema";
import * as schemaJSON from '../schema/schema.json'
import * as draft6MetaSchema from "ajv/dist/refs/json-schema-draft-06.json"

const ajv = new Ajv({
  allErrors: true,
  passContext: true,
  strict: true, 
  // make BK's schema work
  strictSchema: false,
  strictTypes: false,
  
}).addMetaSchema(draft6MetaSchema)


const schemaValidator = ajv.compile(schemaJSON)

export function validate(pipeline: PipelineSchema): Array<ErrorObject> {
  const valid = schemaValidator(pipeline)
  return !valid && schemaValidator.errors ? schemaValidator.errors : []
}
