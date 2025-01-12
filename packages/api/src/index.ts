import Ajv, { ValidateFunction } from 'ajv'
import { createGenerator } from 'ts-json-schema-generator'
import * as path from 'path'

const ajv = new Ajv({ allErrors: true })

const cachedValidator: Record<string, ValidateFunction> = {}

const urlAndTypeNameMap: Record<string, string> = {
  '/v1/call/record/updateStatus': 'Person',
}

const getValidator = (url: string) => {
  const cached = cachedValidator[url]

  if (cached) {
    return cached
  }

  const typeName = urlAndTypeNameMap[url]

  if (typeName) {
    const generator = createGenerator({
      path: path.resolve(__dirname, 'types.ts'),
      type: '*',
    })

    const typeDefinitionsJSONSchema = generator.createSchema()

    ajv.addSchema(typeDefinitionsJSONSchema, 'rootSchema')
    const validator = ajv.getSchema(`rootSchema#/definitions/${typeName}`);
    
    if (validator) {
      cachedValidator[url] = validator
    }

    return validator
  }

  return null
}

// use the below code in request interceptor
const validator = getValidator('/v1/call/record/updateStatus')

if (validator) {
  const pass = validator({
    firstName: 'Ayanami',
    lastName: 'Rei',
    age: 16
  })

  if (pass) {
    console.log('validate success!!!')
  } else {
    console.log(validator.errors)
  }
}
