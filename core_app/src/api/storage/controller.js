import busboy from 'busboy'
import { ControllerManager } from '../../utils/api.js'
import Logger from '../../utils/logger.js'
import storage from './services/fileManagementService.js'

const { log } = new Logger('app:api:storage:controller', 'Auth Controller')

export const list = async (_, res) => {
  const controller = new ControllerManager(log, 'List', res)
  const data = await storage.getFiles();
  return controller.response({data})
}

export const upload = async (req, res) => {
  const bb = busboy({ headers: req.headers })
  const controller = new ControllerManager(log, 'List', res)

  try {
    bb.on('file', async (_, file, info) => {
      const name = info.filename;
      log(`Retrieving file: ${name}`)
      file.pipe(storage.createStream(name))
    })
    bb.on('close', () => {
      log(`Success retrieved file, closing connection!`)
      controller.response()
    })

    req.pipe(bb)
  } catch (error) {
    controller.exception(error)
  }
}
