import { model, Schema, Model, Document } from 'mongoose';

// const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

interface INote extends Document {
  parentId: string;
  title: string;
  content: string;
  type: string;
  createdAt: Date;
}
const noteSchema: Schema = new Schema({
  parentId: { type: ObjectId, ref: 'Note' },
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
    default: Date.now,
  },
});

// export default mongoose.model('Note', noteSchema);
const Note: Model<INote> = model('Note', noteSchema);
export default Note;
