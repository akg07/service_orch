import * as dotenv from 'dotenv';

dotenv.configDotenv();


export const CONSTANT = {
  MONGODB_URI : process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
}
