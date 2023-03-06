import * as yup from 'yup';
import { fetchCommentsService } from '../../../../service/management/model';

const schema = yup.object().shape({
  modelId: yup.string().required('model-id-is-required'),
  language: yup
    .string()
    .oneOf(['pt', 'en', 'es'], 'language-must-be-pt-en-or-es'),
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

  const { modelId, language, pagination } = ctx.request.body;

  const response = await fetchCommentsService({
    modelId,
    language,
    pagination,
  });

  return ctx.ok(response);
};
