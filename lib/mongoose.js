import mongoose from "mongoose";

export async function initMongoose() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  return await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    bufferMaxEntries: 0,
    useFindAndModify: false,
    useCreateIndex: true, });
}