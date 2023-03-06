import mongoose from 'mongoose';
import { mongo } from '../../../config';
import { User } from '../../../domain/entity';
import { updateUserLanguageService } from '../index';
import { UserNotFoundError } from '../../../domain/error';

describe('updateUserLanguage', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('happy day', async () => {
    const user = await User.create({
      email: 'user@email.com',
      name: 'user',
      preferredName: 'user',
      company: 'user co',
      phone: '',
      country: 'Brazil',
      state: '',
      language: 'pt',
      authProviderType: 'email',
      authProviderId: 'user@email.com',
      authProviderSecret: '123456',
    });

    await updateUserLanguageService({
      id: user._id,
      language: 'en',
    });

    const result = await User.findOne({ _id: user._id }).lean();
    expect({ ...result, _id: undefined }).toStrictEqual({
      __v: 0,
      _id: undefined,
      email: 'user@email.com',
      name: 'user',
      preferredName: 'user',
      company: 'user co',
      phone: '',
      country: 'Brazil',
      state: '',
      language: 'en',
      authProviderType: 'email',
      authProviderId: 'user@email.com',
      authProviderSecret: '123456',
      recentViewed: [],
      favorites: [],
    });
  });

  it('user not found', async () => {
    await expect(() =>
      updateUserLanguageService({
        id: new mongoose.Types.ObjectId('5f5f3327a2ccead4c3e62c93'),
        language: 'pt',
      })
    ).rejects.toThrowError(UserNotFoundError);
  });
});
