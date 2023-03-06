import mongoose from 'mongoose';
import { mongo } from '../../../config';
import { User } from '../../../domain/entity';
import { purgeUserService } from '../index';
import { UserNotFoundError } from '../../../domain/error';

describe('purgeUser', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('happy day', async () => {
    const user = await User.create({
      email: 'user@email.com',
      name: 'user',
      preferredName: 'user',
      company: 'user co',
      country: 'Brazil',
      authProviderType: 'email',
      authProviderId: 'user@email.com',
      authProviderSecret: '123456',
    });

    await purgeUserService({ id: user._id });

    const result = await User.findOne({ _id: user._id }).lean();
    expect(result).toBeNull();
  });

  it('user not found', async () => {
    await expect(() =>
      purgeUserService({
        id: new mongoose.Types.ObjectId('5f5f3327a2ccead4c3e62c93'),
      })
    ).rejects.toThrowError(UserNotFoundError);
  });
});
