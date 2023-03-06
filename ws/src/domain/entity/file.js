import mongoose, { Schema } from 'mongoose';

const File = mongoose.model(
  'file',
  new Schema({}, { strict: false }),
  'files.files'
);

export default File;
