import mongoose from "mongoose";
import app from "../src/app.js";

afterAll(async () => {
  await mongoose.connection.close();
  if (global.__MONGOD__) {
    await global.__MONGOD__.stop();
    global.__MONGOD__ = null;
  }
});

export default app;