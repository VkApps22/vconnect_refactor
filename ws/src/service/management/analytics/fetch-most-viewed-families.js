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

const matchProduct = ({ product }) => {
  if (!product || !product.length) return { $match: {} };

  return {
    $match: {
      'modelRef.nameKey': product,
    },
  };
};

const groupByFamily = () => {
  return {
    $group: {
      _id: {
        nameKey: '$modelRef.nameKey',
        familyKey: '$modelRef.familyKey',
      },
      label: {
        $first: '$modelRef.family',
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
    },
  };
};

export default async ({ product, period, date }) => {
  const pipeline = [
    matchPeriod({ period, date }),
    lookUpModel(),
    unwindModelRef(),
    matchProduct({ product }),
    groupByFamily(),
    sortByViews(),
  ];

  return ModelStats.aggregate(pipeline);
};
