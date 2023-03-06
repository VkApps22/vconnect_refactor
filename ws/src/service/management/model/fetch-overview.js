import { Model } from '../../../domain/entity';

const fetchOverview = (groupBy) => {
  return Model.aggregate([
    {
      $group: {
        _id: {
          ...groupBy,
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
};

const fetchProductOverview = () => {
  return fetchOverview({
    nameKey: {
      $toLower: '$nameKey',
    },
  });
};

const fetchFamilyOverview = () => {
  return fetchOverview({
    nameKey: {
      $toLower: '$nameKey',
    },
    familyKey: {
      $toLower: '$familyKey',
    },
  });
};

const fetchModelOverview = () => {
  return fetchOverview({
    nameKey: {
      $toLower: '$nameKey',
    },
    familyKey: {
      $toLower: '$familyKey',
    },
    model: {
      $toLower: '$model',
    },
  });
};

const fetchLastModelModel = () => {
  return Model.findOne({}, null, { sort: { modifiedDate: -1 } }).lean();
};

export default async () => {
  const productOverview = await fetchProductOverview();
  const familyOverview = await fetchFamilyOverview();
  const modelOverview = await fetchModelOverview();
  const lastModifiedModel = await fetchLastModelModel();

  return {
    productCount: productOverview.length,
    familyCount: familyOverview.length,
    modelCount: modelOverview.length,
    lastUpdated: lastModifiedModel.modifiedDate,
  };
};
