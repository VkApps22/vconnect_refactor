import * as yup from 'yup';
import { fetchModelManualsService } from '../../../../service/management/model';

const schema = yup.object().shape({
  id: yup.string().required('id-is-required'),
});

export default async (ctx) => {
  await schema.validate(ctx.query, { abortEarly: false });

  const { id } = ctx.query;

  const response = await fetchModelManualsService({ id });

  return ctx.ok(response);
};
