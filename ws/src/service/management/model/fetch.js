import { Model } from '../../../domain/entity';

const matchByText = ({ language, text }) => {
  const query = {};
  if (text && text.trim().length > 0)
    query.$text = {
      $search: `"${text.trim()}"`,
      $language: language,
      $caseSensitive: false,
      $diacriticSensitive: false,
    };

  return { $match: query };
};

const projectCodePattern = ({ text }) => {
  return {
    $addFields: {
      matchCodePattern: {
        $regexMatch: {
          input: text,
          regex: '$codePattern',
        },
      },
    },
  };
};

const matchByCodePattern = () => {
  return {
    $match: {
      matchCodePattern: true,
    },
  };
};

const projectItem = () => {
  return {
    $project: {
      nameKey: '$nameKey',
      name: '$name',
      familyKey: '$familyKey',
      family: '$family',
      model: '$model',
      rating: '$manuals.reviews.rating',
    },
  };
};

const paginate = ({ pagination }) => {
  return {
    $facet: {
      items: [
        {
          $sort: {
            nameKey: 1,
            familyKey: 1,
            model: 1,
          },
        },
        {
          $skip: pagination.page * pagination.limit,
        },
        {
          $limit: pagination.limit,
        },
      ],
      info: [
        {
          $group: {
            _id: null,
            count: {
              $sum: 1,
            },
          },
        },
      ],
    },
  };
};

const unwindManual = () => {
  return {
    $unwind: {
      path: '$manual',
      preserveNullAndEmptyArrays: true,
    },
  };
};

const lookupManual = () => {
  return {
    $lookup: {
      from: 'manuals',
      localField: 'manual.value',
      foreignField: '_id',
      as: 'manuals',
    },
  };
};

const unwindManuals = () => {
  return {
    $unwind: {
      path: '$manuals',
      preserveNullAndEmptyArrays: true,
    },
  };
};

const unwindReviews = () => {
  return {
    $unwind: {
      path: '$manuals.reviews',
      preserveNullAndEmptyArrays: true,
    },
  };
};

const projectCounts = () => {
  return {
    $group: {
      _id: '$_id',
      nameKey: {
        $first: '$nameKey',
      },
      name: {
        $first: '$name',
      },
      familyKey: {
        $first: '$familyKey',
      },
      family: {
        $first: '$family',
      },
      model: {
        $first: '$model',
      },
      yesCount: {
        $sum: {
          $cond: [
            {
              $eq: ['$rating', 1],
            },
            1,
            0,
          ],
        },
      },
      noCount: {
        $sum: {
          $cond: [
            {
              $eq: ['$rating', -1],
            },
            1,
            0,
          ],
        },
      },
      partiallyCount: {
        $sum: {
          $cond: [
            {
              $eq: ['$rating', 0],
            },
            1,
            0,
          ],
        },
      },
    },
  };
};

const filterByRating = ({ filter }) => {
  const query = {};
  if (filter && filter.rating) query.rating = filter.rating;

  return {
    $match: query,
  };
};

const projectRating = () => {
  return {
    $addFields: {
      rating: {
        $switch: {
          branches: [
            {
              case: {
                $and: [
                  {
                    $gt: ['$yesCount', 0],
                  },
                  {
                    $gt: ['$yesCount', '$noCount'],
                  },
                  {
                    $gte: ['$yesCount', '$partiallyCount'],
                  },
                ],
              },
              then: 'positive',
            },
            {
              case: {
                $and: [
                  {
                    $gt: ['$noCount', 0],
                  },
                  {
                    $gt: ['$noCount', '$yesCount'],
                  },
                  {
                    $gte: ['$noCount', '$partiallyCount'],
                  },
                ],
              },
              then: 'negative',
            },
            {
              case: {
                $or: [
                  {
                    $gt: ['$partiallyCount', 0],
                  },
                  {
                    $gt: ['$noCount', 0],
                  },
                  {
                    $gt: ['$yesCount', 0],
                  },
                ],
              },
              then: 'neutral',
            },
          ],
          default: null,
        },
      },
    },
  };
};

export default async ({ language, text, filter, pagination }) => {
  const codeSearch = text && /^\d{7,8}$/.test(text);
  const match = [
    ...(!codeSearch ? [matchByText({ language, text })] : []),
    projectCodePattern({ text }),
    ...(codeSearch ? [matchByCodePattern()] : []),
  ];

  const pipeline = [
    ...match,
    unwindManual(),
    lookupManual(),
    unwindManuals(),
    unwindReviews(),
    projectItem(),
    projectCounts(),
    projectRating(),
    filterByRating({ filter }),
    paginate({ pagination }),
  ];

  const result = (await Model.aggregate(pipeline))[0];

  return {
    items: result.items,
    count: result.info.length > 0 ? result.info[0].count || 0 : 0,
  };
};
