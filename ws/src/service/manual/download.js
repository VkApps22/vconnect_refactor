import mongoose from 'mongoose';
import { Manual } from '../../domain/entity';
import { ManualNotFoundError } from '../../domain/error';

export default async ({ manualId }) => {
  const manual = await Manual.findOne({ _id: manualId });
  if (!manual) throw new ManualNotFoundError();

  const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'files',
  });

  return gfs.openDownloadStream(manual.file);
};
