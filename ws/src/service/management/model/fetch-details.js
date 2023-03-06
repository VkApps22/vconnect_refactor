import { Model } from '../../../domain/entity';
import { ModelNotFoundError } from '../../../domain/error';

export default async ({ id }) => {
  const model = await Model.findOne({ _id: id }).lean();

  if (!model) throw new ModelNotFoundError();

  return model;
};
