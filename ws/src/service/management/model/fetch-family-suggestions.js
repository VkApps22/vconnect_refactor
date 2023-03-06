import { Model } from '../../../domain/entity';

const unwindFamily = () => {
  return {
    $unwind: {
      path: '$family',
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

const groupByFamilyKey = ({ language, query }) => {
  return {
    $group: {
      _id: '$familyKey',
      familyKey: { $first: '$familyKey' },
      family: {
        $addToSet: '$family',
      },
      matches: {
        $sum: {
          $cond: [
            {
              $and: [
                { $eq: ['$family.language', language] },
                {
                  $regexFind: {
                    input: '$family.value',
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

const sortByFamilyKey = () => {
  return {
    $sort: {
      familyKey: 1,
    },
  };
};

export default async ({ language, query }) => {
  const pipeline = [
    unwindFamily(),
    groupByFamilyKey({ language, query }),
    matchLanguageQuery(),
    sortByFamilyKey(),
  ];
  return Model.aggregate(pipeline);
};
