import mongoose from 'mongoose';
import 'dotenv/config';
import seedUser from './userSeeder';

const MONGO_DB_URL = 'mongodb://localhost:27017/ProjectTest';

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI
    || MONGO_DB_URL,
) => mongoose.connect(mongoDatabaseURI);


seedUser()

export default connectToDatabase;