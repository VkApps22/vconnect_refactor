import mongoose, { Schema } from 'mongoose';

const modelImageSchema = new Schema({
  image: { type: String, required: true },
  model: { type: mongoose.Types.ObjectId, ref: 'model', required: true },
  thumbnail: { type: Boolean },
});

const ModelImage = mongoose.model(
  'modelImage',
  modelImageSchema,
  'models.images'
);

export default ModelImage;
