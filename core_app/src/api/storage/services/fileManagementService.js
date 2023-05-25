import config from 'config'
import fs from 'fs'
import { randomUUID } from '../../../utils/security.js'

const { path } = config.get('storage')

const load = () => {
  const exits = fs.existsSync(path)
  if (!exits) {
    fs.mkdirSync(path)
  }
}

const createStream = (name) => {
  const uuid = randomUUID().slice(1, 4)
  const filePath = `${path}/${uuid}-${name}`
  return fs.createWriteStream(filePath)
}

const getFiles = () => {
  return new Promise((resolve) => fs.readdir(path, (_, files) => resolve(files)))
}

export default {
  getFiles,
  createStream,
  load
}
