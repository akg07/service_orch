import * as mongoose from 'mongoose';
import { CONSTANT } from 'src/common/utils/constants';


export const databaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async(): Promise<void> => {
      try{
        return mongoose
          .connect(CONSTANT.MONGODB_URI)
          .then(() => {
            console.log('DATABASE CONNECTED ', CONSTANT.MONGODB_URI)
          })
      }
      catch(error) {
        console.log('Database connection', error);
        throw error;
      }
    }
  }
]