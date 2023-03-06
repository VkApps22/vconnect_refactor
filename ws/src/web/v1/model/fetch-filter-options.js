import { fetchModelFilterOptionsService } from '../../../service/model';

export default async (ctx) => {
  const response = await fetchModelFilterOptionsService();

  return ctx.ok(response);
};
