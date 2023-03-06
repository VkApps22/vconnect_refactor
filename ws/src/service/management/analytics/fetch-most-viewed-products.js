import getDateInterval from './get-date-interval';
import { ModelStats } from '../../../domain/entity';

const matchPeriod = ({ period, date }) => {
  const { startDate, endDate } = getDateInterval({ period, date });
  if (!startDate || !endDate) return { $match: {} };

  return {
    $match: {
      $and: [{ date: { $gte: startDate } }, { date: { $lte: endDate } }],
    },
  };
};

const lookUpModel = () => {
  return {
    $lookup: {
      from: 'models',
      foreignField: '_id',
      localField: 'model',
      as: 'modelRef',
    },
  };
};

const unwindModelRef = () => {
  return {
    $unwind: {
      path: '$modelRef',
    },
  };
};

const groupByProduct = () => {
  return {
    $group: {
      _id: '$modelRef.nameKey',
      label: {
        $first: '$modelRef.name',
      },
      value: {
        $sum: '$views',
      },
    },
  };
};

const sortByViews = () => {
  return {
    $sort: {
      value: -1,
      _id: 1,
    },
  };
};

export default async ({ period, date }) => {
  const pipeline = [
    matchPeriod({ period, date }),
    lookUpModel(),
    unwindModelRef(),
    groupByProduct(),
    sortByViews(),
  ];

  return ModelStats.aggregate(pipeline);
};
