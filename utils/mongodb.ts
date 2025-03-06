import mongoose from "mongoose";

const DATABASE_URL: string | undefined = process.env.MONGODB_URI;
if (!DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
let cached = global.mongoose;

if (!cached) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    if (DATABASE_URL) {
      cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
        return mongoose;
      });
    } else {
      throw new Error("URL undefined");
    }
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
