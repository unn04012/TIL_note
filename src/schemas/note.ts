import mongoose from 'mongoose';

const { Schema } = mongoose;
const noteSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Note', noteSchema);
