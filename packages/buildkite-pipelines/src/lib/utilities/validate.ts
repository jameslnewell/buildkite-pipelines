import {createRequire} from 'node:module';
import {Ajv, type ErrorObject} from 'ajv';
import {PipelineSchema} from '../schema/index.js';
import {PipelineBuilder} from '../builders/index.js';
import {isPipelineBuilder} from '../builders/isPipelineBuilder.js';

// JSON modules are loaded via `createRequire` rather than an `import ... with
// {type: 'json'}` attribute so the source stays parseable by the repo's
// Prettier 2 / swc toolchain while emitting ESM.
const require = createRequire(import.meta.url);
const schemaJSON = require('../schema/schema.json');
const draft6MetaSchema = require('ajv/dist/refs/json-schema-draft-06.json');

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
