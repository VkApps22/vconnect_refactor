import * as yup from 'yup';
import { fetchMostViewedProductsService } from '../../../../service/management/analytics';

const schema = yup.object().shape({
  period: yup
    .string()
    .oneOf(
      ['daily', 'monthly', 'yearly', 'all'],
      'period-must-be-daily-monthly-yearly-or-all'
    )
    .required('period-is-required'),
  date: yup.date().when('period', {
    is: (value) => value !== 'all',
    then: yup.date().required('date-is-required'),
  }),
});

export default async (ctx) => {
  await schema.validate(ctx.query, { abortEarly: false });

  const { period, date } = ctx.query;

  const response = await fetchMostViewedProductsService({ period, date });
  return ctx.ok(response);
};
