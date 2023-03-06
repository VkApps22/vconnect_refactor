import * as yup from 'yup';
import { createSessionService } from '../../../service/session';

const schema = yup.object().shape({
  method: yup
    .string()
    .oneOf(
      ['email', 'facebook', 'linkedin', 'apple'],
      'method-must-be-email-facebook-or-linkedin'
    )
    .required('method-is-required'),
  email: yup.string().when('method', {
    is: 'email',
    then: yup
      .string()
      .email('email-must-be-a-valid-email')
      .required('email-is-required'),
  }),
  password: yup.string().when('method', {
    is: 'email',
    then: yup.string().required('password-is-required'),
  }),
  authorizationCode: yup.string().when('method', {
    is: (method) => ['facebook', 'linkedin', 'apple'].includes(method),
    then: yup.string().required('authorization-code-is-required'),
  }),
  redirectUri: yup.string().when('method', {
    is: (method) => ['facebook', 'linkedin', 'apple'].includes(method),
    then: yup.string().required('redirect-uri-is-required'),
  }),
  data: yup.object().when('method', {
    is: 'apple',
    then: yup
      .object()
      .shape({
        userId: yup.string().required('user-id-is-required'),
      })
      .required('data-is-required'),
  }),
});

export default async (ctx) => {
  await schema.validate(ctx.request.body, { abortEarly: false });

  const {
    method,
    email,
    password,
    authorizationCode,
    redirectUri,
    data,
  } = ctx.request.body;
  const response = await createSessionService({
    method,
    email,
    password,
    authorizationCode,
    redirectUri,
    data,
  });
  return ctx.ok(response);
};
