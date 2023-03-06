import * as yup from 'yup';
import { fetchCommentsOverviewService } from '../../../../service/management/model';

const schema = yup.object().shape({
  modelId: yup.string().required('model-id-is-required'),
  language: yup
    .string()
    .oneOf(['pt', 'en', 'es'], 'language-must-be-pt-en-or-es'),
});

export default async (ctx) => {
  await schema.validate(ctx.query, { abortEarly: false });

  const { modelId, language } = ctx.query;

  const response = await fetchCommentsOverviewService({
    modelId,
    language,
  });

  return ctx.ok(response);
};
