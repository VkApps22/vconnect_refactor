import * as yup from 'yup';
import { fetchModelDetailsService } from '../../../../service/management/model';

const schema = yup.object().shape({
  id: yup.string().required('id-is-required'),
});

export default async (ctx) => {
  await schema.validate(ctx.query, { abortEarly: false });

  const { id } = ctx.query;

  const response = await fetchModelDetailsService({
    id,
  });

  return ctx.ok(response);
};
