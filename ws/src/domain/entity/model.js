import mongoose, { Schema } from 'mongoose';

const localizedStringSchema = new Schema(
  {
    value: { type: String, required: true },
    language: { type: String, required: true },
  },
  { _id: false }
);

const localizedManualSchema = new Schema(
  {
    value: { type: mongoose.Types.ObjectId, ref: 'manual', required: true },
    language: { type: String, required: true },
  },
  { _id: false }
);

const modelSchema = new Schema({
  codePattern: { type: String, required: true },
  augmentifyId: { type: String },
  nameKey: { type: String, required: true },
  name: [localizedStringSchema],
  familyKey: { type: String, required: true },
  family: [localizedStringSchema],
  manual: [localizedManualSchema],
  model: { type: String, required: true },
  description: [localizedStringSchema],
  playlist: { type: String },
  thumbnail: { type: String },
  createdDate: { type: Date, required: true },
  modifiedDate: { type: Date, required: true },
});

modelSchema.index({
  codePattern: 'text',
  augmentifyId: 'text',
  model: 'text',
  'name.value': 'text',
  'family.value': 'text',
  'manual.value': 'text',
});

const Model = mongoose.model('model', modelSchema, 'models');

export default Model;
