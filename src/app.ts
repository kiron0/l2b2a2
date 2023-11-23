import cors from 'cors'
import 'dotenv/config'
import express, { Application, NextFunction, Request, Response } from 'express'
import * as path from 'path'
import routes from './app/routes'

// import routes here
import { dbConnect } from './utils/dbConnect'
const app: Application = express()

app.use(cors())

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

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: false,
    message: `Can't find ${req.originalUrl} on this server!`,
  })
})

export default app
