import moment from 'moment';
import { Model, ModelStats, User } from '../../domain/entity';
import { ModelNotFoundError } from '../../domain/error';

const updateRecentViewed = async ({ userId, modelId, model }) => {
  const user = await User.findOne({ _id: userId }).populate('recentViewed');
  if (user) {
    const recentViewed = user.recentViewed.filter((p) => p.id !== modelId);
    const newRecentViewed = [model, ...recentViewed].slice(0, 10);
    await User.updateOne({ _id: user.id }, { recentViewed: newRecentViewed });
  }
};

const updateStats = async ({ model }) => {
  const date = moment().startOf('day');
  await ModelStats.updateOne(
    { model, date },
    {
      $inc: {
        views: 1,
      },
    },
    {
      upsert: true,
    }
  );
};

export default async ({ userId, modelId, incognito }) => {
  const model = await Model.findOne({ _id: modelId }).lean();

  if (!model) throw new ModelNotFoundError();

  if (!incognito) {
    await updateRecentViewed({ userId, modelId, model });
    await updateStats({ model });
  }

  return model;
};
