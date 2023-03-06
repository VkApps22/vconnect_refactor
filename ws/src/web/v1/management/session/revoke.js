import { revokeSessionService } from '../../../../service/management/session';

export default async (ctx) => {
  const { sessionId } = ctx.state.user;
  await revokeSessionService({ sessionId });

  return ctx.ok();
};
