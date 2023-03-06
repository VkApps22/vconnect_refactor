import * as yup from 'yup';
import moment from 'moment';
import { generateSessionService } from '../../../service/session';
import { checkVerificationCodeService } from '../../../service/verification-code';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('email-must-be-a-valid-email')
    .required('email-is-required'),
  verificationCode: yup.string().required('verification-code-is-required'),
});

export default async (ctx) => {
  await schema.validate(ctx.request.body, { abortEarly: false });

  const { email, verificationCode } = ctx.request.body;

  const { userId } = await checkVerificationCodeService({
    email,
    verificationCode,
  });
  const session = await generateSessionService({
    userId,
    expiresIn: moment().add(1, 'hours').toDate(),
  });
  return ctx.ok({
    token: session.token,
  });
};
