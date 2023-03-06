import { fetchRecentViewedService } from '../../../service/user';

export default async (ctx) => {
  const { userId } = ctx.state.user;
  const response = await fetchRecentViewedService({ id: userId });

  return ctx.ok(response);
};
