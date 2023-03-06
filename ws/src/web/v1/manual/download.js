import * as yup from 'yup';
import { downloadManualService } from '../../../service/manual';

const schema = yup.object().shape({
  manualId: yup.string().required('manual-id-is-required'),
});

export default async (ctx) => {
  await schema.validate(ctx.query, { abortEarly: false });

  const { manualId } = ctx.query;

  ctx.response.body = await downloadManualService({
    manualId,
  });
  ctx.response.set('content-type', 'application/pdf');
  ctx.response.set(
    'content-disposition',
    `attachment; filename=${manualId}.pdf`
  );
};
