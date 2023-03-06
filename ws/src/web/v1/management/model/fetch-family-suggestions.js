import * as yup from 'yup';
import { fetchFamilySuggestionsService } from '../../../../service/management/model';

const schema = yup.object().shape({
  query: yup.string(),
  language: yup
    .string()
    .oneOf(['pt', 'en', 'es'], 'language-must-be-pt-en-or-es'),
});

export default async (ctx) => {
  await schema.validate(ctx.query, { abortEarly: false });

  const { language, query } = ctx.query;

  const response = await fetchFamilySuggestionsService({
    language,
    query,
  });

  return ctx.ok(response);
};
