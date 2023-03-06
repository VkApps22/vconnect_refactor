import { User } from '../../domain/entity';
import { UserNotFoundError } from '../../domain/error';

export default async ({ id, language }) => {
  const existing = await User.findOne({ _id: id });
  if (!existing) throw new UserNotFoundError();

  await User.updateOne(
    { _id: id },
    {
      language,
    }
  );
};
