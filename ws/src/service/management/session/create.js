import { emailAuth } from '../../auth';
import createSession from '../../session/generate';
import { User } from '../../../domain/entity';
import { InvalidCredentialsError } from '../../../domain/error';

export default async ({ email, password }) => {
  const result = await emailAuth({ email, password });
  const user = await User.findOne({
    authProviderType: 'email',
    authProviderId: email.toLowerCase(),
  });

  if (!user) throw new InvalidCredentialsError();
  if (!user.accessLevel) throw new InvalidCredentialsError();

  const session = await createSession({
    userId: result.userId,
    expiresIn: result.expiresIn,
  });

  return {
    email: result.email,
    name: result.name,
    preferredName: result.preferredName,
    company: result.company,
    phone: result.phone,
    country: result.country,
    state: result.state,
    language: result.language,
    token: session.token,
    lastAccessed: result.lastAccessed,
  };
};
