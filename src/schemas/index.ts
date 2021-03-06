import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const { MONGO_ID, MONGO_PW, MONGO_PORT, NODE_ENV } = process.env;
const connect = async () => {
  if (NODE_ENV !== 'production') mongoose.set('debug', true);
  try {
    await mongoose.connect(`mongodb://${MONGO_ID}:${MONGO_PW}@127.0.0.1:${MONGO_PORT}`, {
      dbName: 'notes',
    });
    console.log('connection success');
  } catch (err) {
    console.log('connection failed');
    console.log(err);
  }
};

export default connect;
