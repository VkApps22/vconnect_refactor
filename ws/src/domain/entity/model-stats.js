import mongoose, { Schema } from 'mongoose';

const modelStatsSchema = new Schema({
  date: { type: Date, required: true },
  model: { type: mongoose.Types.ObjectId, ref: 'model', required: true },
  views: { type: Number, required: true },
});

const ModelStats = mongoose.model(
  'modelStats',
  modelStatsSchema,
  'models.stats'
);

export default ModelStats;
