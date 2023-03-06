import mongoose from 'mongoose';
import { Model } from '../../../domain/entity';

const matchModel = ({ id }) => {
  return {
    $match: {
      _id: mongoose.Types.ObjectId(id),
    },
  };
};
const unwindManual = () => {
  return {
    $unwind: {
      path: '$manual',
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

const projectResult = () => {
  return {
    $project: {
      _id: '$manuals._id',
      language: '$manuals.language',
      sections: '$manuals.sections',
    },
  };
};
export default async ({ id }) => {
  const pipeline = [
    matchModel({ id }),
    unwindManual(),
    lookupManual(),
    unwindManuals(),
    projectResult(),
  ];

  return Model.aggregate(pipeline);
};
