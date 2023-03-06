import bcrypt from 'bcrypt';
import { User } from '../../domain/entity';
import { EmailAlreadyRegisteredError } from '../../domain/error';

export default async ({
  email,
  name,
  preferredName,
  company,
  phone,
  country,
  state,
  password,
  language,
}) => {
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) throw new EmailAlreadyRegisteredError();

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    email,
    name,
    preferredName,
    company,
    phone,
    country,
    state,
    language,
    lastUpdated: new Date(),
    authProviderType: 'email',
    authProviderId: email.toLowerCase(),
    authProviderSecret: hashedPassword,
  });
};
