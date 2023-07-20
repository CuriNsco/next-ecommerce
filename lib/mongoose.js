import mongoose from "mongoose";

const MONGODB_URI= process.env.MONGODB_URI

export async function initMongoose() {

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  return await mongoose.connect(MONGODB_URI, { useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    });
}