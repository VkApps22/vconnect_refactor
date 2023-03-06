import bcrypt from 'bcrypt';
import { mongo } from '../../../config';
import createUserService from '../create';
import { User } from '../../../domain/entity';
import { EmailAlreadyRegisteredError } from '../../../domain/error';

describe('createUser', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('happy day', async () => {
    await createUserService({
      email: 'email',
      password: 'password',
      company: 'company',
      country: 'country',
      name: 'name',
      preferredName: 'name',
    });

    const user = await User.findOne({ email: 'email' }).lean();

    await expect(
      bcrypt.compare('password', user.authProviderSecret)
    ).resolves.toBeTruthy();

    expect({
      ...user,
      _id: undefined,
      authProviderSecret: undefined,
      lastUpdated: undefined,
    }).toStrictEqual({
      __v: 0,
      _id: undefined,
      email: 'email',
      authProviderId: 'email',
      authProviderSecret: undefined,
      authProviderType: 'email',
      company: 'company',
      country: 'country',
      name: 'name',
      preferredName: 'name',
      recentViewed: [],
      favorites: [],
      lastUpdated: undefined,
    });
  });

  it('email already registered', async () => {
    await createUserService({
      email: 'email',
      password: '123456',
      name: 'name',
      preferredName: 'name',
    });

    await expect(() =>
      createUserService({
        email: 'email',
        password: '7890abc',
        name: 'another name',
        preferredName: 'name',
      })
    ).rejects.toThrowError(EmailAlreadyRegisteredError);
  });
});
