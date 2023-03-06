import {
  InvalidSessionError,
  SessionRevokedOrExpiredError,
} from '../../../domain/error';
import { Session } from '../../../domain/entity';

export default async ({ sessionId }) => {
  const session = await Session.findById(sessionId);
  if (!session) throw new InvalidSessionError();

  if (session.revoked || session.expiresIn <= new Date())
    throw new SessionRevokedOrExpiredError();

  session.revoked = true;
  await session.save();
};
