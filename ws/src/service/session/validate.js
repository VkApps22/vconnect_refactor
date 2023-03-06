import { Session, User } from '../../domain/entity';
import {
  SessionRevokedOrExpiredError,
  UserNotFoundError,
} from '../../domain/error';

export default async ({ userId, sessionId }) => {
  const user = await User.findOne({ _id: userId }).lean();
  if (!user) throw new UserNotFoundError();

  const session = await Session.findOne({ _id: sessionId }).lean();
  if (!session || session.revoked || session.expiresIn <= new Date())
    throw new SessionRevokedOrExpiredError();

  return {
    email: user.email,
    name: user.name,
    preferredName: user.preferredName,
    company: user.company,
    phone: user.phone,
    country: user.country,
    state: user.state,
    language: user.language,
    lastAccessed: user.lastAccessed,
    lastUpdated: user.lastUpdated,
    token: session.token,
  };
};
