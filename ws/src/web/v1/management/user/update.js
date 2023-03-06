import * as yup from 'yup';
import { updateUserService } from '../../../../service/management/user';

const schema = yup.object().shape({
  accessLevel: yup
    .number()
    .min(0, 'access-level-must-be-greater-than-or-equal-0')
    .max(2, 'access-level-must-be-less-than-or-equal-2')
    .required('access-level-is-required'),
  targetUserId: yup.string().required('target-user-id-is-required'),
});

export default async (ctx) => {
  await schema.validate(ctx.request.body, { abortEarly: false });

  const { userId } = ctx.state.user;
  const { targetUserId, accessLevel } = ctx.request.body;

  await updateUserService({
    userId,
    targetUserId,
    accessLevel,
  });

  return ctx.ok();
};
