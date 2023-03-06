import { User } from '../../../domain/entity';
import {
  InsufficientAccessLevelError,
  TargetUserNotFoundError,
  UserNotFoundError,
} from '../../../domain/error';
import { env } from '../../../config';

export default async ({ userId, targetUserId, accessLevel }) => {
  const user = await User.findOne({ _id: userId });
  if (!user) throw new UserNotFoundError();

  const targetUser = await User.findOne({ _id: targetUserId });
  if (!targetUser) throw new TargetUserNotFoundError();

  if (user.accessLevel < targetUser.accessLevel)
    throw new InsufficientAccessLevelError();

  if (user.accessLevel < accessLevel) throw new InsufficientAccessLevelError();

  if (!targetUser.email.endsWith(`@${env.COMPANY_EMAIL_DOMAIN}`))
    throw new InsufficientAccessLevelError();

  await User.updateOne({ _id: targetUserId }, { accessLevel });
};
