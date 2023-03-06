import moment from 'moment';
import { Model } from '../../domain/entity';
import getDateInterval from '../management/analytics/get-date-interval';

export default async () => {
  const { startDate, endDate } = getDateInterval({
    period: 'monthly',
    date: moment().subtract(1, 'months'),
  });
  const lookup = {
    from: 'models.stats',
    localField: '_id',
    foreignField: 'model',
    as: 'stats',
  };
  const unwindStats = {
    path: '$stats',
    preserveNullAndEmptyArrays: true,
  };
  const matchStats = {
    $or: [
      {
        $and: [
          { 'stats.date': { $gte: startDate } },
          { 'stats.date': { $lte: endDate } },
        ],
      },
      {
        stats: { $exists: false },
      },
    ],
  };
  const sort = {
    views: -1,
    nameKey: 1,
    familyKey: 1,
  };
  const groupByName = {
    _id: {
      nameKey: '$nameKey',
      familyKey: '$familyKey',
    },
    name: {
      $first: '$name',
    },
    family: {
      $first: '$family',
    },
    thumbnail: {
      $first: '$thumbnail',
    },
    familyViews: {
      $sum: '$stats.views',
    },
  };

  const groupByFamily = {
    _id: '$_id.nameKey',
    nameKey: {
      $first: '$_id.nameKey',
    },
    name: {
      $first: '$name',
    },
    views: {
      $sum: '$familyViews',
    },
    items: {
      $push: {
        id: '$_id.familyKey',
        nameKey: '$_id.familyKey',
        name: '$family',
        thumbnail: '$thumbnail',
        views: '$familyViews',
      },
    },
  };

  const unwindItems = '$items';

  const regroupByFamily = {
    _id: '$_id',
    nameKey: {
      $first: '$_id',
    },
    name: {
      $first: '$name',
    },
    views: {
      $first: '$views',
    },
    items: {
      $push: '$items',
    },
  };

  const sortItems = {
    views: -1,
    'items.views': -1,
    'items.nameKey': 1,
    'items.familyKey': 1,
  };

  const project = {
    nameKey: '$nameKey',
    name: '$name',
    views: '$views',
    items: {
      $slice: ['$items', 4],
    },
  };

  const pipeline = [
    { $lookup: lookup },
    { $unwind: unwindStats },
    { $match: matchStats },
    { $sort: sort },
    { $group: groupByName },
    { $group: groupByFamily },
    { $unwind: unwindItems },
    { $sort: sortItems },
    { $group: regroupByFamily },
    { $project: project },
    { $sort: sort },
  ];

  return Model.aggregate(pipeline);
};
