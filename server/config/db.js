const mongoose = require('mongoose');

let mongoMemoryServer = null;

const connectDB = async () => {
  const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/greencampus';
  
  try {
    // Attempt standard connection with 3 sec timeout
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to primary URI (${connUri}): ${error.message}`);
    console.log('[MongoDB Info] Initializing MongoMemoryServer fallback for seamless standalone execution...');
    
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongoMemoryServer = await MongoMemoryServer.create();
      const memoryUri = mongoMemoryServer.getUri();
      
      const conn = await mongoose.connect(memoryUri);
      console.log(`[MongoDB Memory] Connected successfully to in-memory database: ${conn.connection.host}`);
    } catch (memErr) {
      console.error('[MongoDB Error] Failed to connect to MongoMemoryServer fallback:', memErr);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
