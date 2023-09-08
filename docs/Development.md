# Development

## Setter methods

Methods should be named like `.set<Property>(value)` when they set a value and calling it again will replace the previous value.

For example:

- `.setLabel(':docker: build')`
- `.setSkip(true)` or `.setSkip('Reason for skipping')`

These methods should allow the `undefined` value which will overwrite the previously set value with the default behaviour.

## Append methods

Methods should be named like `.add<Property>(value)` when they append a value and calling it again will add another value in addition to the previous value.

For example:

- `.addCommand('echo "Hello World!"')`
- `.addEnv('name', 'value')`

These methods should require a value.
