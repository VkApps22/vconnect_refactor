import { ModelImage } from '../../../domain/entity';

export default async ({ id }) => {
  return ModelImage.find({ model: id }).lean();
};
