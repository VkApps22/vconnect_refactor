import moment from 'moment';
import cryptoRandomString from 'crypto-random-string';

import { User } from '../../domain/entity';
import { EmailNotFoundError } from '../../domain/error';
import { sendEmailService } from '../email';
import createTemplate from './template';

export default async ({ email }) => {
  const user = await User.findOne({
    authProviderId: email.toLowerCase(),
    authProviderType: 'email',
  });

  if (!user) throw new EmailNotFoundError();

  user.verificationCode = cryptoRandomString({ length: 6, type: 'numeric' });
  user.verificationExpiresAt = moment().add(1, 'hours').toDate();

  await user.save();

  const body = await createTemplate({
    language: user.language,
    data: {
      verificationCode: user.verificationCode,
      preferredName: user.preferredName,
    },
  });

  sendEmailService({
    to: user.authProviderId,
    ...body,
  });
};
