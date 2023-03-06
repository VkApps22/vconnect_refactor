import * as yup from 'yup';
import { changePasswordService } from '../../../service/user';

const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'password-must-be-at-least-6-characters')
    .required('password-is-required'),
});

export default async (ctx) => {
  await schema.validate(ctx.request.body, { abortEarly: false });

  const { password } = ctx.request.body;
  const { userId } = ctx.state.user;
  await changePasswordService({ id: userId, password });

  return ctx.ok();
};
