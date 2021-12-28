import mongoose from 'mongoose';

const { Schema } = mongoose;
const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Note', noteSchema);
