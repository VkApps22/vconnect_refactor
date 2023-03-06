import { emailAuth, facebookAuth, linkedinAuth, appleAuth } from '../auth';
import { InvalidAuthMethodError } from '../../domain/error';
import createSession from './generate';

const authMethods = {
  email: ({ email, password }) => emailAuth({ email, password }),
  facebook: ({ authorizationCode, redirectUri }) =>
    facebookAuth({ authorizationCode, redirectUri }),
  linkedin: ({ authorizationCode, redirectUri }) =>
    linkedinAuth({ authorizationCode, redirectUri }),
  apple: ({ email, authorizationCode, redirectUri, data }) =>
    appleAuth({ email, authorizationCode, redirectUri, data }),
};

export default async ({
  method,
  email,
  password,
  authorizationCode,
  redirectUri,
  data,
}) => {
  const authMethod = authMethods[method];
  if (!authMethod) throw new InvalidAuthMethodError();

  const result = await authMethod({
    method,
    email,
    password,
    authorizationCode,
    redirectUri,
    data,
  });

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
    lastAccessed: result.lastAccessed,
    lastUpdated: result.lastUpdated,
    token: session.token,
  };
};
