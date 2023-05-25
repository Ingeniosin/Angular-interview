import Logger from '../utils/logger.js'
import storageService from '../api/storage/services/index.js'

const { log } = new Logger('app:services', 'Global Services')

const loadServices = async () => {
  await Promise.all([
    storageService()
  ])
}

export default log(loadServices, {
  success: 'Services loaded successfully'
})
