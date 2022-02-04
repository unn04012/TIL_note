import { model, Schema, Model, Document } from 'mongoose';

interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  nick: string;
  password: string;
  salt: string;
  createdAt: Date;
  deletedAt: Date;
}
const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  nick: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const User: Model<IUser> = model('User', userSchema);
export default User;
