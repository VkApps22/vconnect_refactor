import * as yup from 'yup';
import { updateUserLanguageService } from '../../../service/user';

const schema = yup.object().shape({
  language: yup
    .string()
    .oneOf(['pt', 'en', 'es'], 'language-must-be-pt-en-or-es'),
});

export default async (ctx) => {
  await schema.validate(ctx.request.body, { abortEarly: false });

  const { userId } = ctx.state.user;
  const { language } = ctx.request.body;
  await updateUserLanguageService({
    id: userId,
    language,
  });

  return ctx.ok();
};
