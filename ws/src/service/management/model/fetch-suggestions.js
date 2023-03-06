import { Model } from '../../../domain/entity';

const unwindName = () => {
  return {
    $unwind: {
      path: '$name',
    },
  };
};

const matchLanguageQuery = () => {
  return {
    $match: {
      matches: { $gt: 0 },
    },
  };
};

const groupByNameKey = ({ language, query }) => {
  return {
    $group: {
      _id: '$nameKey',
      nameKey: { $first: '$nameKey' },
      name: {
        $addToSet: '$name',
      },
      matches: {
        $sum: {
          $cond: [
            {
              $and: [
                { $eq: ['$name.language', language] },
                {
                  $regexFind: {
                    input: '$name.value',
                    regex: query,
                    options: 'i',
                  },
                },
              ],
            },
            1,
            0,
          ],
        },
      },
    },
  };
};

const sortByNameKey = () => {
  return {
    $sort: {
      nameKey: 1,
    },
  };
};

export default async ({ language, query }) => {
  const pipeline = [
    unwindName(),
    groupByNameKey({ language, query }),
    matchLanguageQuery(),
    sortByNameKey(),
  ];
  return Model.aggregate(pipeline);
};
