import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let mongoClient;
let mongoClientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    mongoClient = new MongoClient(uri, options);
    global._mongoClientPromise = mongoClient.connect();
  }
  mongoClientPromise = global._mongoClientPromise;
} else {
  mongoClient = new MongoClient(uri, options);
  mongoClientPromise = mongoClient.connect();
}

export default async function connectMongoDB() {
  return mongoClientPromise;
}
