import * as yup from 'yup';
import { sendVerificationCodeService } from '../../../service/verification-code';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('email-must-be-a-valid-email')
    .required('email-is-required'),
});

export default async (ctx) => {
  await schema.validate(ctx.request.body, { abortEarly: false });

  const { email } = ctx.request.body;
  await sendVerificationCodeService({ email });

  return ctx.ok();
};
