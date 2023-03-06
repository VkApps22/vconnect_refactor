import bcrypt from 'bcrypt';
import { User } from '../../domain/entity';
import { UserNotFoundError } from '../../domain/error';

export default async ({ id, password }) => {
  const user = await User.findOne({
    _id: id,
    authProviderType: 'email',
  });

  if (!user) throw new UserNotFoundError();

  user.authProviderSecret = await bcrypt.hash(password, 10);
  await user.save();
};
