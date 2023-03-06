import mongoose from 'mongoose';
import { mongo } from '../../../config';
import { User } from '../../../domain/entity';
import { updateUserService } from '../index';
import { UserNotFoundError } from '../../../domain/error';

describe('updateUser', () => {
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
      authProviderType: 'email',
      authProviderId: 'user@email.com',
      authProviderSecret: '123456',
    });

    await updateUserService({
      id: user._id,
      name: 'new user',
      preferredName: 'new user',
      company: 'new company',
      phone: '',
      country: 'usa',
      state: '',
    });

    const result = await User.findOne({ _id: user._id }).lean();
    expect({ ...result, _id: undefined, lastUpdated: undefined }).toStrictEqual(
      {
        __v: 0,
        _id: undefined,
        email: 'user@email.com',
        name: 'new user',
        preferredName: 'new user',
        company: 'new company',
        phone: '',
        country: 'usa',
        state: '',
        language: null,
        authProviderType: 'email',
        authProviderId: 'user@email.com',
        authProviderSecret: '123456',
        recentViewed: [],
        favorites: [],
        lastUpdated: undefined,
      }
    );
  });
  it('user not found', async () => {
    await expect(() =>
      updateUserService({
        id: new mongoose.Types.ObjectId('5f5f3327a2ccead4c3e62c93'),
        name: 'new user',
        preferredName: 'new user',
        company: 'new company',
        country: 'usa',
      })
    ).rejects.toThrowError(UserNotFoundError);
  });
});
