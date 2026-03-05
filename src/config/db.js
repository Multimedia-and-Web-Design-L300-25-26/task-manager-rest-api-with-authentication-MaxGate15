import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server-core";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
      return;
    }
    if (process.env.NODE_ENV === "test") {
      if (!global.__MONGOD__) {
        global.__MONGOD__ = await MongoMemoryServer.create();
      }
      const uri = global.__MONGOD__.getUri();
      await mongoose.connect(uri);
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed");
    process.exit(1);
  }
};

export default connectDB;