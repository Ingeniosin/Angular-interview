import { ExceptionHandler } from './exception.js'

export const response = (res, obj, code = 200) => {
  if (res.headersSent) {
    return
  }

  return obj ? res.status(code).json(obj) : res.status(code).send()
}

export class ControllerManager extends ExceptionHandler {
  constructor (logger, prefix, res, payload) {
    super(logger, prefix, res, payload)
    this.res = res
  }

  response (obj, code = 200) {
    return response(this.res, obj, code)
  }
}
