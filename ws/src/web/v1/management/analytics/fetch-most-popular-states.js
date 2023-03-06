import { fetchMostPopularStatesService } from '../../../../service/management/analytics';

export default async (ctx) => {
  const response = await fetchMostPopularStatesService();
  return ctx.ok(response);
};
