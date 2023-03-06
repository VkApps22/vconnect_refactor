import { fetchModelProductsService } from '../../../service/model';

export default async (ctx) => {
  const response = await fetchModelProductsService();

  return ctx.ok(response);
};
