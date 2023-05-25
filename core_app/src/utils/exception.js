import config from 'config'
import { response } from './api.js'

const errors = config.get('errors')

const defaultError = errors.find(x => x.code === 'INTERNAL_ERROR')

export const findException = (code, trace, extras) => {
  let data = errors.find(x => x.code === code) || defaultError
  data = { ...data }

  if (extras && extras.status) {
    data.status = extras.status
    delete extras.status
  }

  return new ApiError(data, trace, extras)
}

class ApiError extends Error {
  constructor ({ message, code, status }, trace, extras) {
    super(message)
    this.code = code
    this.status = status
    this.message = message
    this.trace = trace
    this.extras = extras
  }
}

export class ExceptionHandler {
  constructor (logger, prefix, res, payload) {
    this.logger = logger
    this.res = res
    this.payload = payload
    this.prefix = prefix
  }

  exception (data, specification) {
    const { message, code, status, trace, extras } = typeof data === 'string' ? findException(data, specification) : data

    const prefix = this.prefix ? `[${this.prefix}] ` : ''
    const finalTrace = trace ? ` - ${trace}` : ''
    this.logger(`${prefix}An exception has occurred in request: ${finalTrace} with payload: '${JSON.stringify(this.payload)}' | Code: '${code}' | Message: '${message}'`)

    response(this.res, {
      message,
      ...(extras || {}),
      code
    }, status)
  }
}
