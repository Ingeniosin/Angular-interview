import lodash from 'lodash'
import { findException } from './exception.js'

export const fieldTypes = {
  string: String(),
  number: Number(),
  boolean: Boolean()
}

const buildObjectValidator = (obj, prefix = '') => {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key]
    const newPrefix = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'object' && !Array.isArray(value)) {
      return acc.concat(buildObjectValidator(value, newPrefix))
    }
    return acc.concat({
      key: newPrefix,
      conditions: value
    })
  }, [])
}

export const buildModel = (model) => {
  const objectValidator = buildObjectValidator(model)
  return (values, options = {}) => {
    const mapObject = {}
    const errors = []
    const { strict = true, strictError = 'MALFORMED_JSON' } = options

    if (strict) {
      const keys = Object.keys(values)
      const modelKeys = Object.keys(model)
      const diff = lodash.difference(keys, modelKeys)
      if (diff.length > 0) {
        diff.forEach(key => {
          errors.push(findException(strictError, `Invalid field ${key}`))
        })
      }
    }

    for (const { key, conditions } of objectValidator) {
      const value = lodash.get(values, key)
      lodash.set(mapObject, key, value)

      for (const { error, validation } of conditions) {
        const isValid = validation(value)
        if (isValid) {
          continue
        }

        const message = error(key)
        errors.push(message)
        break
      }
    }

    return {
      data: mapObject,
      valid: errors.length === 0,
      error: errors[0]
    }
  }
}

export const required = (code) => {
  return {
    validation: (value) => value !== undefined && value.length > 0,
    error: (key) => findException(code, `An error occurred while validating the field ${key} - the field is required`, {
      detail: `The field '${key}' is required`
    })
  }
}
