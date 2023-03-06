import * as yup from 'yup';
import { fetchContactService } from '../../../service/contact';

const schema = yup.object().shape({
  language: yup
    .string()
    .oneOf(['pt', 'en', 'es'], 'language-must-be-pt-en-or-es')
    .required('language-is-required'),
  country: yup.string(),
  state: yup.string(),
});

export default async (ctx) => {
  await schema.validate(ctx.query, { abortEarly: false });

  const { language, country, state } = ctx.query;

  const response = await fetchContactService({
    language,
    country,
    state,
  });

  return ctx.ok(response);
};
