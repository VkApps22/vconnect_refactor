import { User, Model, ModelImage, ModelStats } from '../../../domain/entity';
import { ModelNotFoundError } from '../../../domain/error';

export default async ({ id }) => {
  const exists = await Model.exists({ _id: id });
  if (!exists) throw new ModelNotFoundError();

  await User.updateMany(
    {},
    { $pull: { recentViewed: id, favorites: id } },
    { multi: true }
  );
  await ModelStats.deleteMany({ model: id });
  await ModelImage.deleteMany({ model: id });
  await Model.deleteOne({ _id: id });
};
