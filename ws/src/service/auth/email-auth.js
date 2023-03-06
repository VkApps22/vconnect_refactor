import moment from 'moment';
import bcrypt from 'bcrypt';
import { User } from '../../domain/entity';
import { InvalidCredentialsError } from '../../domain/error';

export default async ({ email, password }) => {
  const user = await User.findOne({
    authProviderType: 'email',
    authProviderId: email.toLowerCase(),
  });

  if (!user) throw new InvalidCredentialsError();

  const valid = await bcrypt.compare(password, user.authProviderSecret);
  if (!valid) throw new InvalidCredentialsError();

  const { lastAccessed } = user;
  user.lastAccessed = new Date();
  await user.save();

  return {
    email: user.email,
    name: user.name,
    preferredName: user.preferredName,
    company: user.company,
    phone: user.phone,
    country: user.country,
    state: user.state,
    language: user.language,
    userId: user._id,
    lastAccessed,
    lastUpdated: user.lastUpdated,
    expiresIn: moment().add('365', 'days').toDate(),
  };
};
