import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';

export default (fileName) => {
  const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'files',
  });

  const readStream = fs.createReadStream(
    path.resolve(__dirname, 'assets', 'pdfs', fileName)
  );
  const uploadStream = gfs.openUploadStream(fileName);
  readStream.pipe(uploadStream);

  return uploadStream.id;
};
