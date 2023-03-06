import bcrypt from 'bcrypt';
import { User } from '../../domain/entity';

export default async () => {
  const hashedPassword = await bcrypt.hash('TdgTWEg@#$aE@#!@RTFf', 10);
  await User.create({
    email: 'root@daitan.com',
    name: 'Root',
    preferredName: 'Root',
    company: 'Daitan',
    country: 'Brazil',
    state: 'SP',
    accessLevel: 3,
    language: 'pt',
    lastUpdated: new Date(),
    authProviderType: 'email',
    authProviderId: 'root@daitan.com',
    authProviderSecret: hashedPassword,
  });
};
