import * as yup from 'yup';
import { removeModelService } from '../../../../service/management/model';

const schema = yup.object().shape({
  id: yup.string().required('id-is-required'),
});

export default async (ctx) => {
  await schema.validate(ctx.request.body, { abortEarly: false });

  const { id } = ctx.request.body;

  await removeModelService({ id });

  return ctx.ok();
};
