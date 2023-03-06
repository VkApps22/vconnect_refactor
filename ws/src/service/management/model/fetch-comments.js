import { Model } from '../../../domain/entity';

export default async ({ modelId, language }) => {
  const model = await Model.findOne({ _id: modelId })
    .populate({
      path: 'manual.value',
      model: 'manual',
      populate: {
        path: 'reviews.author',
        model: 'user',
      },
    })
    .lean();
  const manuals = language
    ? model.manual
        .filter((manual) => manual.language === language)
        .flatMap((manual) => manual.value)
    : model.manual.flatMap((manual) => manual.value);
  const reviews = manuals
    .flatMap((manual) => manual.reviews || [])
    .sort((a, b) => b.date - a.date);

  return {
    items: reviews.map((review) => ({
      id: review.author._id,
      rating: review.rating,
      comment: review.comment,
      authorName: review.author.name,
      date: review.date,
    })),
    total: reviews.length,
  };
};
