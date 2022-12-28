import { connect, set } from 'mongoose';

export const connectDb = async () => {
  try {
    set('strictQuery', false);
    await connect(process.env.MONGODB_URI || 'mongodb://localhost/tasksdb');
    console.log('Mongodb connected', process.env.MONGODB_URI);
  } catch (error) {
    console.error(error);
  }
};
