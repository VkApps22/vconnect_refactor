import { validateSessionService } from '../../../service/session';

export default async (ctx) => {
  const { userId, sessionId } = ctx.state.user;
  const response = await validateSessionService({
    userId,
    sessionId,
  });

  return ctx.ok(response);
};
