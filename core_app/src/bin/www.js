import setupApp from '../app.js'
import http from 'http'
import Logger from '../utils/logger.js'

const { log } = new Logger('app:express', 'Express')

const normalizePort = (val) => {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

const onError = (error) => {
  if (error.syscall !== 'listen') { throw error }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

const onListening = (server) => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  log('Listening on ' + bind)
}

const port = normalizePort(process.env.PORT || '3000')

process
  .on('unhandledRejection', (reason, p) => {
    log(`Unhandled Rejection at: Promise ${JSON.stringify(reason)}, reason: ${JSON.stringify(reason)}`)
    if (reason instanceof Error) {
      log(reason.stack)
    }
    process.exit(1)
  })
  .on('uncaughtException', err => log('An uncaught exception occurred: ' + err))

const start = async () => {
  log('Starting server...')
  const app = await setupApp()
  app.set('port', port)
  const server = http.createServer(app)
  server.listen(port)
  server.on('error', onError)
  server.on('listening', () => onListening(server))
}

start()
