import { fetchFavoritesService } from '../../../service/user';

export default async (ctx) => {
  const { userId } = ctx.state.user;
  const response = await fetchFavoritesService({ id: userId });

  return ctx.ok(response);
};
