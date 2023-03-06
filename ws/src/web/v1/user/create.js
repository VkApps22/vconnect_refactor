import * as yup from 'yup';
import { createUserService } from '../../../service/user';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('email-must-be-a-valid-email')
    .required('email-is-required'),
  name: yup
    .string()
    .required('name-is-required')
    .matches(/^([^0-9]*)$/, 'name-cannot-contain-numbers'),
  preferredName: yup
    .string()
    .max(20, 'preferred-name-length-must-be-less-than')
    .required('preferred-name-is-required')
    .matches(/^([^0-9]*)$/, 'preferred-name-cannot-contain-numbers'),
  language: yup
    .string()
    .oneOf(['pt', 'en', 'es'], 'language-must-be-pt-en-or-es')
    .required('language-is-required'),
  company: yup.string(),
  phone: yup.string(),
  country: yup.string(),
  state: yup.string(),
  password: yup
    .string()
    .min(6, 'password-must-be-at-least-6-characters')
    .required('password-is-required'),
});

export default async (ctx) => {
  await schema.validate(ctx.request.body, { abortEarly: false });

  const {
    email,
    name,
    preferredName,
    company,
    phone,
    country,
    state,
    password,
    language,
  } = ctx.request.body;
  await createUserService({
    email,
    name,
    preferredName,
    company,
    phone,
    country,
    state,
    password,
    language,
  });

  return ctx.ok();
};
