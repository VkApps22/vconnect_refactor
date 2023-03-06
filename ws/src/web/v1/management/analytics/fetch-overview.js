import { fetchAnalyticsOverviewService } from '../../../../service/management/analytics';

export default async (ctx) => {
  const response = await fetchAnalyticsOverviewService();
  return ctx.ok(response);
};
