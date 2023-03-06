import * as yup from 'yup';
import { removeReviewManualService } from '../../../../service/management/manual';

const schema = yup.object().shape({
  manualId: yup.string().required('manual-id-is-required'),
});

export default async (ctx) => {
  await schema.validate(ctx.request.body, { abortEarly: false });

  const { userId } = ctx.state.user;
  const { manualId } = ctx.request.body;

  await removeReviewManualService({
    manualId,
    authorId: userId,
  });

  return ctx.ok();
};
