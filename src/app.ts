import cors from 'cors'
import 'dotenv/config'
import express, { Application, NextFunction, Request, Response } from 'express'
import * as path from 'path'
import routes from './app/routes'

// import routes here
import { dbConnect } from './utils/dbConnect'
const app: Application = express()

app.use(cors())

// Set the path to the views directory
app.set('views', path.join(__dirname, '../views'))

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database connection
dbConnect()

// Application routes
app.use('/api', routes)

//Welcome route
app.get('/', async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../views/welcome.html'))
})

// Error handling
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not found')
  res.status(404)
  next(error)
})

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: false,
    message: `Can't find ${req.originalUrl} on this server!`,
  })
})

export default app
