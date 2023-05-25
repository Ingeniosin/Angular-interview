import { response } from '../../utils/api.js'
import Logger from '../../utils/logger.js'
const { log } = new Logger('app:api:middleware:handlers:404', '404 - Middleware')

const handler404 = async (req, res, next) => {
  const payload = {
    endpoint: req.originalUrl,
    method: req.method,
    ip: req.ip
  }

  log(`An exception has occurred in request: '404' with payload: '${JSON.stringify(payload)}' Message: 'Not Found'`)
  return response(res, {
    code: 404,
    message: 'Not Found',
    timestamp: new Date().toISOString()
  }, 404)
}

export default handler404
