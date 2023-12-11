import { Server } from 'http';
import app from './app'
import config from './configs/index'
import colors from "colors";
import mongoose from 'mongoose';

let server: Server;

const startServer = async () => {
  try {
    if (!config.database_url) {
      console.log(colors.red.bold.italic("❌ Database url not found in .env file"))
    }
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(colors.green.bold.italic(`🌐 Server running on port ${config.port} 🔥`))
      console.log(colors.green.bold.italic(`🗄️  Database connected ❤️‍🔥`))
    })
  } catch (error) {
    console.log(colors.red.bold.italic(`${error}`))
  }
}

startServer();

process.on('unhandledRejection', () => {
  console.log(colors.red.bold.italic(`😈 unhandledRejection is detected , shutting down ...`));
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(colors.red.bold.italic(`😈 uncaughtException is detected , shutting down ...`));
  process.exit(1);
});