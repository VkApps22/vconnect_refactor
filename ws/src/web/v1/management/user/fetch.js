import * as yup from 'yup';
import { fetchUserService } from '../../../../service/management/user';

const schema = yup.object().shape({
  companyDomain: yup.bool(),
  text: yup.string(),
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

  const { userId } = ctx.state.user;
  const { companyDomain, text, pagination } = ctx.request.body;
  const response = await fetchUserService({
    userId,
    companyDomain,
    text,
    pagination,
  });
  return ctx.ok(response);
};
