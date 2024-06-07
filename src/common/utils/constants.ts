import * as dotenv from 'dotenv';

dotenv.configDotenv();


export const CONSTANT = {
  MONGODB_URI : process.env.MONGODB_URI
}
