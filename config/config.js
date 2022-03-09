const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://' + 
        (
          'localhost' /* localhost is for MongoDB connection in local environment */
          // 'mongo' /* And mongo is for MongoDB connection in docker */ 
        ) + ':' +
    (process.env.MONGO_PORT || '27017') +
    '/graspconfig'
}

export default config
