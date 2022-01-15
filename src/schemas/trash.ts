import { model, Schema, Model, Document } from 'mongoose';

// const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

interface ITrash extends Document {
  _id: Schema.Types.ObjectId;
  parentId?: string;
  title: string;
  content: string;
  search: string;
  createdAt: Date;
  deletedAt: Date;
}
const trashSchema: Schema = new Schema({
  parentId: { type: ObjectId, ref: 'Trash' },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  search: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  deletedAt: {
    type: Date,
    default: Date.now,
  },
});

// export default mongoose.model('Note', noteSchema);
const Trash: Model<ITrash> = model('Trash', trashSchema);
export default Trash;
