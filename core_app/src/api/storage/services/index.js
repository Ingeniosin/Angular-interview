import Logger from '../../../utils/logger.js'
import storage from './fileManagementService.js'

const { log } = new Logger('app:api:storage:services', 'Auth Services')

const loadServices = async () => {
  storage.load()
}

export default log(loadServices, {
  start: 'Loading services...',
  success: 'Services loaded successfully'
})
