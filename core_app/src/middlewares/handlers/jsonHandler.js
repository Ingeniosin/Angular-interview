import { ExceptionHandler } from '../../utils/exception.js'
import Logger from '../../utils/logger.js'
const { log } = new Logger('app:api:middleware:rules:json', 'Json Validator - Middleware')

const jsonHandler = async (err, req, res, next) => {
  const exceptionHandler = new ExceptionHandler(log, null, res, {
    endpoint: req.originalUrl,
    method: req.method,
    ip: req.ip
  })

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return exceptionHandler.exception('MALFORMED_JSON', 'Bad Request')
  }

  next()
}

export default jsonHandler
