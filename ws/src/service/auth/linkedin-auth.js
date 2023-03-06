import axios from 'axios';
import qs from 'querystring';
import moment from 'moment';
import { env } from '../../config';
import { User } from '../../domain/entity';
import { BadLinkedinAuthError } from '../../domain/error';

export default async ({ authorizationCode, redirectUri }) => {
  let lnResponse;
  try {
    const call = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      qs.stringify({
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: redirectUri,
        client_id: env.LN_APP_ID,
        client_secret: env.LN_APP_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    lnResponse = call.data;
  } catch (err) {
    throw new BadLinkedinAuthError();
  }

  const axiosConfig = {
    headers: { Authorization: `Bearer ${lnResponse.access_token}` },
  };

  let profileInfo;
  try {
    const call = await axios.get('https://api.linkedin.com/v2/me', axiosConfig);
    profileInfo = call.data;
  } catch (err) {
    throw new BadLinkedinAuthError();
  }

  let contactInfo;
  try {
    const call = await axios.get(
      ' https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
      axiosConfig
    );
    contactInfo = call.data;
  } catch (err) {
    throw new BadLinkedinAuthError();
  }
  const emailHandle = contactInfo.elements
    ? contactInfo.elements.find(
        (element) => element.type === 'EMAIL' && element.primary
      )
    : null;
  const primaryEmail = emailHandle ? emailHandle['handle~'].emailAddress : '';

  let user = await User.findOne({
    authProviderType: 'linkedin',
    authProviderId: profileInfo.id,
  });

  if (!user) {
    user = await User.create({
      email: primaryEmail,
      name: `${profileInfo.localizedFirstName} ${profileInfo.localizedLastName}`,
      preferredName: profileInfo.localizedFirstName,
      company: '',
      phone: '',
      country: '',
      state: '',
      authProviderType: 'linkedin',
      authProviderId: profileInfo.id,
      authProviderSecret: lnResponse.access_token,
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
