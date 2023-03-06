import * as yup from 'yup';
import { addReviewManualService } from '../../../service/manual';

const schema = yup.object().shape({
  manualId: yup.string().required('manual-id-is-required'),
  rating: yup
    .number()
    .required('rating-is-required')
    .oneOf([-1, 0, 1], 'rating-must-be-minus-1-0-1'),
  comment: yup.string(),
});

export default async (ctx) => {
  await schema.validate(ctx.request.body, { abortEarly: false });

  const { userId } = ctx.state.user;
  const { manualId, rating, comment } = ctx.request.body;

  await addReviewManualService({
    manualId,
    authorId: userId,
    rating,
    comment,
  });

  return ctx.ok();
};
