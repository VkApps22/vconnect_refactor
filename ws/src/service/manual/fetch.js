import { Manual } from '../../domain/entity';
import { ManualNotFoundError } from '../../domain/error';

export default async ({ manualId }) => {
  const manual = await Manual.findOne({ _id: manualId }).lean();
  if (!manual) throw new ManualNotFoundError();

  const { file, ...view } = manual;
  return view;
};
