import * as yup from 'yup';
import { fetchModelService } from '../../../../service/management/model';

const schema = yup.object().shape({
  language: yup
    .string()
    .oneOf(['pt', 'en', 'es'], 'language-must-be-pt-en-or-es')
    .required('language-is-required'),
  text: yup.string(),
  filter: yup
    .object()
    .shape({
      rating: yup.string().oneOf(['positive', 'negative', 'neutral', '']),
    })
    .required('filter-is-required'),
  pagination: yup
    .object()
    .shape({
      page: yup
        .number()
        .min(0, 'pagination-page-must-be-greater-than-or-equal-to-zero')
        .required('pagination-page-is-required'),
      limit: yup
        .number()
        .min(0, 'pagination-limit-must-be-greater-than-or-equal-to-zero')
        .required('pagination-limit-is-required'),
    })
    .required('pagination-is-required'),
});

export default async (ctx) => {
  await schema.validate(ctx.request.body, { abortEarly: false });

  const { language, text, filter, pagination } = ctx.request.body;

  const response = await fetchModelService({
    language,
    text,
    filter,
    pagination,
  });

  return ctx.ok(response);
};
