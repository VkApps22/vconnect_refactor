import { Model, User } from '../../domain/entity';
import {
  NotYetInFavoritesError,
  ModelNotFoundError,
  UserNotFoundError,
} from '../../domain/error';
import { ModelItem } from '../../domain/projection';

export default async ({ id, modelId }) => {
  const user = await User.findOne({
    _id: id,
  }).populate('favorites', ModelItem);

  if (!user) throw new UserNotFoundError();

  const model = await Model.findOne({
    _id: modelId,
  }).lean();

  if (!model) throw new ModelNotFoundError();

  const favorited = user.favorites.some((item) => item.equals(model._id));

  if (!favorited) throw new NotYetInFavoritesError();

  user.favorites = user.favorites.filter((item) => !item.equals(model._id));

  await user.save();

  return { favorites: user.favorites };
};
