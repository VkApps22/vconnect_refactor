import * as yup from 'yup';
import { fetchManualService } from '../../../service/manual';

const schema = yup.object().shape({
  manualId: yup.string().required('manual-id-is-required'),
});

export default async (ctx) => {
  await schema.validate(ctx.query, { abortEarly: false });

  const { manualId } = ctx.query;

  const response = await fetchManualService({
    manualId,
  });

  return ctx.ok(response);
};
