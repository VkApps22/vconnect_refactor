import * as yup from 'yup';
import { addFavoriteService } from '../../../service/user';

const schema = yup.object().shape({
  modelId: yup.string().required('model-id-is-required'),
});

export default async (ctx) => {
  await schema.validate(ctx.request.body, { abortEarly: false });
  const { userId } = ctx.state.user;
  const { modelId } = ctx.request.body;

  const response = await addFavoriteService({
    id: userId,
    modelId,
  });

  return ctx.ok(response);
};
