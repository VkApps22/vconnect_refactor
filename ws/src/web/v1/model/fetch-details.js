import * as yup from 'yup';
import { fetchModelDetailsService } from '../../../service/model';

const schema = yup.object().shape({
  modelId: yup.string().required('model-id-is-required'),
  incognito: yup.bool(),
});

export default async (ctx) => {
  await schema.validate(ctx.query, { abortEarly: false });

  const { userId } = ctx.state.user;
  const { modelId, incognito } = ctx.query;

  const response = await fetchModelDetailsService({
    userId,
    modelId,
    incognito,
  });

  return ctx.ok(response);
};
