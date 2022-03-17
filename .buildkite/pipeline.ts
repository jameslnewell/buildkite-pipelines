import {stringify, validate, Pipeline, CommandStep} from '../src'

const pipeline = new Pipeline({
  steps: [
    new CommandStep().command('echo "test"')
  ]
})

const object = pipeline.build()
const errors = !validate(object)
if (errors) {
  throw errors
}

console.log(JSON.stringify(object, null, 2))
console.log()
console.log(stringify(object))