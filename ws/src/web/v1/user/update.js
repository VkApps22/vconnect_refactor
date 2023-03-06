import * as yup from 'yup';
import { updateUserService } from '../../../service/user';

const schema = yup.object().shape({
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
  email: yup.string().email('email-must-be-a-valid-email'),
  company: yup.string(),
  phone: yup.string(),
  country: yup.string(),
  state: yup.string(),
});

export default async (ctx) => {
  await schema.validate(ctx.request.body, { abortEarly: false });

  const { userId } = ctx.state.user;
  const {
    name,
    preferredName,
    email,
    company,
    phone,
    country,
    state,
    language,
  } = ctx.request.body;
  await updateUserService({
    id: userId,
    name,
    preferredName,
    email,
    company,
    phone,
    country,
    state,
    language,
  });

  return ctx.ok();
};
