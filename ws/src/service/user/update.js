import { User } from '../../domain/entity';
import { UserNotFoundError } from '../../domain/error';

export default async ({
  id,
  name,
  preferredName,
  email,
  company,
  phone,
  country,
  state,
  language,
}) => {
  const existing = await User.findOne({ _id: id });
  if (!existing) throw new UserNotFoundError();

  await User.updateOne(
    { _id: id },
    {
      name,
      preferredName,
      ...(email && { email }),
      company,
      phone,
      country,
      state,
      language,
      lastUpdated: new Date(),
    }
  );
};
