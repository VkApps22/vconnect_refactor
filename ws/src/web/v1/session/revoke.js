import { revokeSessionService } from '../../../service/session';

export default async (ctx) => {
  const { sessionId } = ctx.state.user;
  await revokeSessionService({ sessionId });

  return ctx.ok();
};
