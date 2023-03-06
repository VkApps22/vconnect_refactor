import { Model } from '../../../domain/entity';

export default async ({ modelId, language }) => {
  const model = await Model.findOne({ _id: modelId })
    .populate('manual.value')
    .lean();
  const manuals = language
    ? model.manual
        .filter((manual) => manual.language === language)
        .flatMap((manual) => manual.value)
    : model.manual.flatMap((manual) => manual.value);
  const reviews = manuals
    .flatMap((manual) => manual.reviews || [])
    .sort((a, b) => b.date - a.date);

  const yesReviews = reviews.filter((review) => review.rating === 1);
  const noReviews = reviews.filter((review) => review.rating === -1);
  const partiallyReviews = reviews.filter((review) => review.rating === 0);

  return {
    yesCount: yesReviews.length,
    noCount: noReviews.length,
    partiallyCount: partiallyReviews.length,
    lastYesReview: yesReviews.length > 0 ? yesReviews[0].date : undefined,
    lastNoReview: noReviews.length > 0 ? noReviews[0].date : undefined,
    lastPartiallyReview:
      partiallyReviews.length > 0 ? partiallyReviews[0].date : undefined,
  };
};
