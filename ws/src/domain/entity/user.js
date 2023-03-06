import mongoose, { Schema } from 'mongoose';

const modelRef = {
  type: mongoose.Types.ObjectId,
  ref: 'model',
};

const userSchema = new Schema({
  email: { type: String, lowercase: true, required: true, index: true },
  name: { type: String, required: true },
  preferredName: { type: String, required: true },
  company: { type: String },
  phone: { type: String },
  country: { type: String },
  state: { type: String },
  language: { type: String },
  accessLevel: { type: Number },
  authProviderType: { type: String, required: true, index: true },
  authProviderId: { type: String, required: true, index: true },
  authProviderSecret: { type: String, required: true, index: true },
  verificationCode: { type: String },
  verificationExpiresAt: { type: Date },
  recentViewed: [modelRef],
  favorites: [modelRef],
  lastAccessed: { type: Date },
  lastUpdated: { type: Date },
});

userSchema.index(
  {
    email: 'text',
    name: 'text',
    preferredName: 'text',
    company: 'text',
    country: 'text',
    state: 'text',
    phone: 'text',
  },
  {
    default_language: 'none',
    language_override: 'none',
  }
);

const User = mongoose.model('user', userSchema, 'users');

export default User;
