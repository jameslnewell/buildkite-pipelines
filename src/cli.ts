import path from 'path'
import {stringify, validate} from './api'

(async () => {
  const filename = process.argv[2]
  if (!filename) {
    throw new Error(`No pipeline filename specified`);
  }
  const filepath = path.resolve(path.join(process.cwd(), filename))
  const pipeline = require(filepath)?.pipeline
  if (!pipeline) {
    throw new Error(`No pipeline exported from ${filename}`);
  }
  
  const object = pipeline.build()
  const errors = !validate(object)
  if (errors) {
    throw errors
  }
  
  console.log(stringify(object))
})()
