import config from 'config'
import debug from 'debug'
import fs from 'fs'

const env = process.env.NODE_ENV || 'develop'

if (env !== 'test') {
  debug.enable('app:*')
}

const logPath = config.get('logPath')

if (!fs.existsSync(logPath)) {
  fs.mkdirSync(logPath)
}

const debugStream = fs.createWriteStream(`${logPath}/${new Date().toISOString().replace(/:/g, '-')}.log`, { flags: 'a' })

const decorateByType = {
  Function: (fn, start, success, write) => {
    return (...args) => {
      write(getMessage(start, ...args))
      const result = fn(...args)
      args.unshift(result)
      write(getMessage(success, ...args))
      return result
    }
  },
  AsyncFunction: (fn, start, success, write) => {
    return async (...args) => {
      write(getMessage(start, ...args))
      const result = await fn(...args)
      args.unshift(result)
      write(getMessage(success, ...args))
      return result
    }
  }
}

class Logger {
  constructor (name, prefix) {
    this.name = name
    this.logger = debug(name)
    this.prefix = prefix
  }

  log = (fn, { start, success } = {}) => {
    const type = fn.constructor.name
    if (type === 'String') {
      return this.write(getMessage(fn))
    }

    return decorateByType[type](fn, start, success, this.write)
  }

  write = (message) => {
    const isValid = message && message.length > 0
    if (!isValid) {
      return
    }

    const finalMessage = '[' + this.prefix + '] ' + message
    this.logger(finalMessage)
    debugStream.write(`${new Date().toISOString()} [${this.name}] ${finalMessage}\n`)
  }
}

const { log } = new Logger('app:utils:logger', 'Logger')

const getMessage = (message, ...args) => {
  if (!message) {
    return
  }

  try {
    return typeof message === 'string' ? message : message(...args)
  } catch (error) {
    log('Error getting message: ' + error.message + ' - ' + error.stack)
    return null
  }
}

export default Logger
