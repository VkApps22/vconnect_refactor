import * as yup from 'yup';
import { fetchModelImagesService } from '../../../service/model';

const schema = yup.object().shape({
  modelId: yup.string().required('model-id-is-required'),
});

export default async (ctx) => {
  await schema.validate(ctx.query, { abortEarly: false });

  const { modelId } = ctx.query;

  const response = await fetchModelImagesService({
    modelId,
  });

  return ctx.ok(response);
};
