import { Model } from '../../domain/entity';

const buildTextQueryStage = ({ language, text }) => {
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

const buildCodePatternProjectionStage = ({ text }) => {
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

const buildCodeQueryStage = () => {
  return {
    $match: {
      matchCodePattern: true,
    },
  };
};

const buildFilterStage = ({ filter }) => {
  const query = {};
  if (filter && filter.product) query.nameKey = filter.product;

  if (filter && filter.family) query.familyKey = filter.family;

  if (filter && filter.models && filter.models.length > 0)
    query.model = { $in: filter.models };

  return { $match: query };
};

const buildItemProjectionStage = () => {
  return {
    $project: {
      codePattern: '$codePattern',
      augmentifyId: '$augmentifyId',
      nameKey: '$nameKey',
      name: '$name',
      familyKey: '$familyKey',
      family: '$family',
      model: '$model',
      thumbnail: '$thumbnail',
      createdDate: '$createdDate',
      modifiedDate: '$modifiedDate',
    },
  };
};

const buildPaginationStage = ({ pagination }) => {
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

export default async ({ language, text, filter, pagination }) => {
  const codeSearch = text && /^\d{7,8}$/.test(text);
  const pipeline = [
    ...(!codeSearch ? [buildTextQueryStage({ language, text })] : []),
    buildCodePatternProjectionStage({ text }),
    ...(codeSearch ? [buildCodeQueryStage()] : []),
    buildFilterStage({ filter }),
    buildItemProjectionStage(),
    buildPaginationStage({ pagination }),
  ];

  const result = (await Model.aggregate(pipeline))[0];

  return {
    items: result.items,
    count: result.info.length > 0 ? result.info[0].count || 0 : 0,
  };
};
