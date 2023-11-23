import mongoose from 'mongoose'
import config from '../configs/index'
import colors from "colors";

const dbConnect = async (): Promise<void> => {
  try {
    if (!config.database_url) {
      console.log(colors.red.bold.italic("❌ Database url not found in .env file"))
    }
    await mongoose.connect(config.database_url as string)
    console.log(colors.green.bold.italic(`🗄️  Database connected ❤️‍🔥`))
  } catch (err: unknown | [message?: string] | string | undefined) {
    console.log(colors.red.bold.italic(`❌ Error connecting to database: ${err}`))
  }
}

export { dbConnect }
