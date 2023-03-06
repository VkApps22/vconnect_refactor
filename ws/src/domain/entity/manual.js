import mongoose, { Schema } from 'mongoose';

const sectionSchema = new Schema(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    page: { type: Number, required: true },
  },
  { _id: false }
);

const reviewSchema = new Schema(
  {
    rating: { type: Number, required: true },
    comment: { type: String },
    date: { type: Date, required: true },
    author: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
  },
  { _id: false }
);

const manualSchema = new Schema({
  file: { type: mongoose.Types.ObjectId, ref: 'file', required: true },
  sections: [sectionSchema],
  language: { type: String, required: true },
  reviews: [reviewSchema],
});

const Manual = mongoose.model('manual', manualSchema, 'manuals');

export default Manual;
