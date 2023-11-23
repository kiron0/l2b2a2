export default {
  port: process.env.PORT || 8000,
  database_url: process.env.MONGO_URI,
  env: process.env.NODE_ENV,
}
