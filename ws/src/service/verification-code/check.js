import { User } from '../../domain/entity';
import {
  EmailNotFoundError,
  ExpiredVerificationCodeError,
  InvalidVerificationCodeError,
} from '../../domain/error';

export default async ({ email, verificationCode }) => {
  const user = await User.findOne({
    authProviderId: email.toLowerCase(),
    authProviderType: 'email',
  });

  if (!user) throw new EmailNotFoundError();

  if (user.verificationCode !== verificationCode)
    throw new InvalidVerificationCodeError();

  if (user.verificationExpiresAt <= new Date())
    throw new ExpiredVerificationCodeError();

  user.verificationCode = undefined;
  user.verificationExpiresAt = undefined;

  await user.save();

  return {
    userId: user._id,
  };
};
