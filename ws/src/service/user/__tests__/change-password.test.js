import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { User } from '../../../domain/entity';
import changePasswordService from '../change-password';
import { mongo } from '../../../config';
import { UserNotFoundError } from '../../../domain/error';

const createUser = () =>
  User.create({
    email: 'user@email.com',
    name: 'user',
    preferredName: 'user',
    company: 'user co',
    country: 'Brazil',
    authProviderType: 'email',
    authProviderId: 'user@email.com',
    authProviderSecret: '123456',
  });

describe('changePassword', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('happy day', async () => {
    const user = await createUser();

    await changePasswordService({
      id: user._id,
      password: 'newPassword',
    });

    const result = await User.findOne({
      _id: user._id,
    }).lean();

    await expect(
      bcrypt.compare('newPassword', result.authProviderSecret)
    ).resolves.toBeTruthy();
  });

  it('not found', async () => {
    await expect(() =>
      changePasswordService({
        id: new mongoose.Types.ObjectId(),
        password: 'newPassword',
      })
    ).rejects.toThrowError(UserNotFoundError);
  });
});
