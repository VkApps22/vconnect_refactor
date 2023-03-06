import { Model } from '../../domain/entity';

export default async () => {
  const query = {};
  const sort = {
    nameKey: 1,
    familyKey: 1,
  };
  const groupByNameFamilyModel = {
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
    models: { $addToSet: '$model' },
  };

  const groupByName = {
    _id: '$_id.nameKey',
    nameKey: {
      $first: '$_id.nameKey',
    },
    name: {
      $first: '$name',
    },
    families: {
      $push: {
        id: '$_id.familyKey',
        nameKey: '$_id.familyKey',
        name: '$family',
        models: '$models',
      },
    },
  };

  const unwindFamilies = '$families';

  const regroupByName = {
    _id: '$_id',
    nameKey: {
      $first: '$_id',
    },
    name: {
      $first: '$name',
    },
    families: {
      $push: '$families',
    },
  };

  const sortFamilies = { 'families.nameKey': 1, 'families.familyKey': 1 };

  const project = {
    nameKey: '$nameKey',
    name: '$name',
    families: '$families',
  };

  const pipeline = [
    { $match: query },
    { $sort: sort },
    { $group: groupByNameFamilyModel },
    { $group: groupByName },
    { $unwind: unwindFamilies },
    { $sort: sortFamilies },
    { $group: regroupByName },
    { $project: project },
    { $sort: sort },
  ];

  return Model.aggregate(pipeline);
};
