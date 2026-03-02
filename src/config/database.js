/**
 * Database Configuration
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  const shouldConnectMongo = process.env.ENABLE_MONGODB === 'true' || Boolean(mongoUri);

  if (!shouldConnectMongo) {
    console.log('ℹ️ MongoDB connection skipped (set ENABLE_MONGODB=true or MONGODB_URI to enable).');
    return null;
  }

  const resolvedMongoUri = mongoUri || 'mongodb://localhost:27017/techni-worker';

  try {
    const conn = await mongoose.connect(resolvedMongoUri);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Database connection error: ${error.message}`);
    return null;
  }
};

module.exports = connectDB;
