import cors from 'cors'
import express, { json, urlencoded } from 'express'
import handler404 from './middlewares/handlers/handler404.js'
import jsonHandler from './middlewares/handlers/jsonHandler.js'
import routes from './routes/index.js'
import loadServices from './services/index.js'

const corsOptions = {
  origin: 'http://localhost:4200'
}

const app = express()
app.use(cors())
app.use(json())
app.use(jsonHandler)
app.use(urlencoded({ extended: false }))
app.use(routes)
app.use(handler404)

const setupApp = async () => {
  await loadServices()
  return app
}

export default setupApp
