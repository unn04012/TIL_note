import { model, Schema, Model, Document } from 'mongoose';

// const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

interface INote extends Document {
  title: string;
  content: string;
  parent: any;
  pages: [any];
  createdAt: Date;
}
const noteSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  parent: ObjectId,
  pages: [ObjectId],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// export default mongoose.model('Note', noteSchema);
const Note: Model<INote> = model('Note', noteSchema);
export default Note;
