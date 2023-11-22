import mongoose from 'mongoose'
import config from '../configs/index'
import { errorLog, log } from './logger'

const dbConnect = async (): Promise<void> => {
  try {
    if (!config.database_url) {
      errorLog.error('❌ No MONGO_URI found in .env file')
    }
    await mongoose.connect(config.database_url as string)
    log.info(`🗄️  Database connected ❤️‍🔥`)
  } catch (err: unknown | [message?: string] | string | undefined) {
    errorLog.error(`❌ Error connecting to database: ${err}`)
  }
}

export { dbConnect }
