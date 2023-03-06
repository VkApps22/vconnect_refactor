import * as yup from 'yup';
import { createSessionService } from '../../../../service/management/session';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('email-must-be-a-valid-email')
    .required('email-is-required'),
  password: yup.string().required('password-is-required'),
});

export default async (ctx) => {
  await schema.validate(ctx.request.body, { abortEarly: false });

  const { email, password } = ctx.request.body;
  const response = await createSessionService({
    email,
    password,
  });
  return ctx.ok(response);
};
