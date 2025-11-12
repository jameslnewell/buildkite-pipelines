import Ajv, {ErrorObject} from 'ajv';
import {PipelineSchema} from '../schema';
import * as schemaJSON from '../schema/schema.json';
import * as draft6MetaSchema from 'ajv/dist/refs/json-schema-draft-06.json';
import {PipelineBuilder} from '../builders';
import {isPipelineBuilder} from '../builders/isPipelineBuilder';

const ajv = new Ajv({
  allErrors: true,
  passContext: true,
  strict: true,
  // make BK's schema work
  strictSchema: false,
  strictTypes: false,
}).addMetaSchema(draft6MetaSchema);

const schemaValidator = ajv.compile(schemaJSON);

export async function validate(
  pipeline: PipelineSchema | PipelineBuilder,
): Promise<Array<ErrorObject>> {
  const valid = schemaValidator(
    isPipelineBuilder(pipeline) ? await pipeline.build() : pipeline,
  );
  return !valid && schemaValidator.errors ? schemaValidator.errors : [];
}
