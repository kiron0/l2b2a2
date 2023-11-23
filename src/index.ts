import app from './app'
import config from './configs/index'
import colors from "colors";

const startServer = async () => {
  try {
    app.listen(config.port, () => {
      console.log(colors.green.bold.italic(`🌐 Server running on port ${config.port} 🔥`))
    })
  } catch (error) {
    console.log(colors.red.bold.italic(`${error}`))
  }
}

startServer()
