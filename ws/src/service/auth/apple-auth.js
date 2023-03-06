import appleSignin from 'apple-signin-auth';
import moment from 'moment';
import { env } from '../../config';
import { User } from '../../domain/entity';
import { BadAppleAuthError } from '../../domain/error';

export default async ({ email, authorizationCode, redirectUri, data }) => {
  let token = null;
  try {
    const clientSecret = appleSignin.getClientSecret({
      clientID: env.APPLE_APP_ID,
      teamID: env.APPLE_TEAM_ID,
      keyIdentifier: env.APPLE_APP_SECRET,
      privateKey: env.APPLE_PRIVATE_KEY,
    });

    const options = {
      clientID: env.APPLE_APP_ID,
      clientSecret,
      redirectUri,
    };

    const tokenResponse = await appleSignin.getAuthorizationToken(
      authorizationCode,
      options
    );
    if (tokenResponse.error) {
      throw new BadAppleAuthError();
    }
    token = tokenResponse.access_token;
  } catch (err) {
    throw new BadAppleAuthError();
  }

  let user = await User.findOne({
    authProviderType: 'apple',
    authProviderId: data.userId,
  });

  if (!user) {
    user = await User.create({
      email: email ?? '',
      name: `${data.firstName} ${data.lastName}`,
      preferredName: data.firstName,
      company: '',
      phone: '',
      country: '',
      state: '',
      authProviderType: 'apple',
      authProviderId: data.userId,
      authProviderSecret: token,
    });
  }

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
