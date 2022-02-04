import { PipelineBuilder } from "./PipelineBuilder";
import { validate } from "./validate";
import { stringify } from "./stringify";
import fs from 'fs';
import util from 'util';

const writeFile = util.promisify(fs.writeFile);

export interface GenerateOptions {
  file?: string;
}

export async function generate(
  pipeline: PipelineBuilder, 
  {file = 'pipeline.yml'}: GenerateOptions = {}
): Promise<string[]> {
  const object = pipeline.build()
  const errors = validate(object)
  if (errors) return errors;
  await writeFile(file, stringify(object));
  return []
}