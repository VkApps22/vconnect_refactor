import axios from 'axios';
import moment from 'moment';
import { env } from '../../config';
import { User } from '../../domain/entity';
import { BadFacebookAuthError } from '../../domain/error';

export default async ({ authorizationCode, redirectUri }) => {
  let fbTokenResponse;
  try {
    const call = await axios.get(
      'https://graph.facebook.com/v8.0/oauth/access_token?' +
        `client_id=${env.FB_APP_ID}&` +
        `redirect_uri=${redirectUri}&` +
        `client_secret=${env.FB_APP_SECRET}&` +
        `code=${authorizationCode}`
    );
    fbTokenResponse = call.data;
  } catch (err) {
    throw new BadFacebookAuthError();
  }

  let fbLongLivedTokenResponse;
  try {
    const call = await axios.get(
      'https://graph.facebook.com/v8.0/oauth/access_token?' +
        'grant_type=fb_exchange_token&' +
        `client_id=${env.FB_APP_ID}&` +
        `client_secret=${env.FB_APP_SECRET}&` +
        `fb_exchange_token=${fbTokenResponse.access_token}`
    );
    fbLongLivedTokenResponse = call.data;
  } catch (err) {
    throw new BadFacebookAuthError();
  }

  let fbMeResponse;
  try {
    const call = await axios.get(
      'https://graph.facebook.com/v8.0/me?fields=id,name,first_name,email,location{location}&' +
        `access_token=${fbLongLivedTokenResponse.access_token}`
    );
    fbMeResponse = call.data;
  } catch (err) {
    throw new BadFacebookAuthError();
  }

  const country =
    fbMeResponse.location && fbMeResponse.location.location
      ? fbMeResponse.location.location.country
      : '';

  let user = await User.findOne({
    authProviderType: 'facebook',
    authProviderId: fbMeResponse.id,
  });

  if (!user) {
    user = await User.create({
      email: fbMeResponse.email,
      name: fbMeResponse.name,
      preferredName: fbMeResponse.first_name,
      company: '',
      phone: '',
      country,
      state: '',
      authProviderType: 'facebook',
      authProviderId: fbMeResponse.id,
      authProviderSecret: fbLongLivedTokenResponse.access_token,
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
