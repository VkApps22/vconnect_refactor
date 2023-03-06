import { Manual, User } from '../../../domain/entity';
import { ManualNotFoundError, UserNotFoundError } from '../../../domain/error';

export default async ({ manualId, authorId }) => {
  const manual = await Manual.findOne({ _id: manualId });
  if (!manual) throw new ManualNotFoundError();

  const user = await User.findOne({ _id: authorId });
  if (!user) throw new UserNotFoundError();

  manual.reviews = manual.reviews.filter(
    (review) => review.author !== authorId
  );
  await manual.save();
};
