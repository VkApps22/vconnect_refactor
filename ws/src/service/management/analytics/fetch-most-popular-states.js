import { User } from '../../../domain/entity';

const matchCountry = () => ({
  $match: {
    country: 'Brazil',
  },
});

const groupByState = () => ({
  $group: {
    _id: '$state',
    label: {
      $first: '$state',
    },
    value: {
      $sum: 1,
    },
  },
});

const sortByValue = () => ({
  $sort: {
    value: -1,
  },
});

export default () => {
  const pipeline = [matchCountry(), groupByState(), sortByValue()];

  return User.aggregate(pipeline);
};
