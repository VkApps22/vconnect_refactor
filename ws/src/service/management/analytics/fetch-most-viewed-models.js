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

const matchFamily = ({ family }) => {
  if (!family || !family.length) return { $match: {} };

  return {
    $match: {
      'modelRef.familyKey': family,
    },
  };
};

const groupByModel = () => {
  return {
    $group: {
      _id: {
        nameKey: '$modelRef.nameKey',
        familyKey: '$modelRef.familyKey',
        model: '$modelRef.model',
      },
      label: {
        $first: '$modelRef.model',
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
      '_id.nameKey': 1,
      '_id.familyKey': 1,
      '_id.model': 1,
    },
  };
};

export default async ({ family, period, date }) => {
  const pipeline = [
    matchPeriod({ period, date }),
    lookUpModel(),
    unwindModelRef(),
    matchFamily({ family }),
    groupByModel(),
    sortByViews(),
  ];

  return ModelStats.aggregate(pipeline);
};
