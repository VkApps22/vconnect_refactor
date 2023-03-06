import moment from 'moment';

export default ({ period, date }) => {
  const momentDate = moment(date);

  switch (period) {
    default:
    case 'all':
      return { startDate: undefined, endDate: undefined };
    case 'daily':
      return {
        startDate: momentDate.startOf('day').toDate(),
        endDate: momentDate.endOf('day').toDate(),
      };
    case 'monthly':
      return {
        startDate: momentDate.startOf('month').toDate(),
        endDate: momentDate.endOf('month').toDate(),
      };
    case 'yearly':
      return {
        startDate: momentDate.startOf('year').toDate(),
        endDate: momentDate.endOf('year').toDate(),
      };
  }
};
