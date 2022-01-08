import { model, Schema, Model, Document } from 'mongoose';

// const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

interface ITrash extends Document {
  parentId: string;
  title: string;
  content: string;
  createdAt: Date;
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

  deletedAt: {
    type: Date,
    default: Date.now,
  },
});

// export default mongoose.model('Note', noteSchema);
const Trash: Model<ITrash> = model('Trash', trashSchema);
export default Trash;
