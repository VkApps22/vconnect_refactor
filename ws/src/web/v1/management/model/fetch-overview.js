import { fetchModelOverviewService } from '../../../../service/management/model';

export default async (ctx) => {
  const response = await fetchModelOverviewService();

  return ctx.ok(response);
};
