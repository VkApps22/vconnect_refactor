import { User } from '../../domain/entity';
import { UserNotFoundError } from '../../domain/error';
import { ModelItem } from '../../domain/projection';

export default async ({ id }) => {
  const existing = await User.findOne({ _id: id })
    .populate('favorites', ModelItem)
    .lean();
  if (!existing) throw new UserNotFoundError();

  const favorites = existing.favorites ? existing.favorites : [];

  return { favorites };
};
