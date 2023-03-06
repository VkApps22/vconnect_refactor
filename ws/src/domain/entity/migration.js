import mongoose, { Schema } from 'mongoose';

const migrationSchema = new Schema({
  name: { type: String, required: true, unique: true, index: true },
  createdAt: { type: Date, unique: true, required: true },
  detectedAt: { type: Date, required: true },
  appliedAt: { type: Date },
  error: { type: String },
});

const Migration = mongoose.model('migration', migrationSchema, 'migrations');

export default Migration;
