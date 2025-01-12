import { createGenerator } from 'ts-json-schema-generator'
import * as path from 'path'

const generator = createGenerator({
  path: path.resolve(__dirname, 'types.ts'),
  type: '*',
})

console.dir(JSON.stringify(generator.createSchema()))