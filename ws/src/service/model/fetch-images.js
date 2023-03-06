import { ModelImage } from '../../domain/entity';

export default async ({ modelId }) => {
  const modelImages = await ModelImage.find({ model: modelId }).lean();
  return modelImages.map((modelImage) => modelImage.image);
};
