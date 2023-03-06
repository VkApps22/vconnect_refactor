import * as yup from 'yup';
import { fetchModelImagesService } from '../../../../service/management/model';

const schema = yup.object().shape({
  id: yup.string().required('id-is-required'),
});

export default async (ctx) => {
  await schema.validate(ctx.query, { abortEarly: false });

  const { id } = ctx.query;

  const response = await fetchModelImagesService({ id });

  return ctx.ok(response);
};
