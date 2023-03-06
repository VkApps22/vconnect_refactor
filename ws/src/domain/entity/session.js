import mongoose, { Schema } from 'mongoose';

const sessionSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'user' },
  token: { type: String, required: true, index: true },
  revoked: { type: Boolean, required: true },
  expiresIn: { type: Date, required: true },
});

const Session = mongoose.model('session', sessionSchema, 'sessions');

export default Session;
