import jsonwebtoken from 'jsonwebtoken';
import emailAuth from '../email-auth';
import { mongo } from '../../../config';
import { User } from '../../../domain/entity';
import { InvalidCredentialsError } from '../../../domain/error';

const user = {
  email: 'email@email.com',
  name: 'name',
  preferredName: 'user',
  company: 'company',
  phone: '12385465456',
  country: 'country',
  state: 'state',
  authProviderType: 'email',
  authProviderId: 'email@email.com',
  authProviderSecret:
    '$2b$10$a9ISpZR2EIWcNIPu8BfDQOXcPmoURGIWEZaGSwwDq6sDBmcYe1JkC',
};

jest.mock('jsonwebtoken');
jest.mock('moment', () => () =>
  jest.requireActual('moment')('2020-01-01T00:00:00.000Z')
);
const mockJsonWebToken = () =>
  jsonwebtoken.sign.mockImplementationOnce(() => 'JWT_TOKEN');

describe('emailAuth', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  test('happy day', async () => {
    mockJsonWebToken();

    await User.create(user);
    const response = await emailAuth({
      email: user.email,
      password: 'password',
    });
    expect({
      ...response,
      userId: undefined,
      lastAccessed: undefined,
      lastUpdated: undefined,
    }).toStrictEqual({
      expiresIn: new Date('2020-12-31T00:00:00.000Z'),
      email: user.email,
      name: user.name,
      preferredName: user.preferredName,
      company: user.company,
      phone: user.phone,
      country: user.country,
      state: user.state,
      language: undefined,
      userId: undefined,
      lastAccessed: undefined,
      lastUpdated: undefined,
    });
  });

  test('incorrect email', async () => {
    await expect(() =>
      emailAuth({
        email: 'notFound@email.com',
        password: user.password,
      })
    ).rejects.toThrowError(InvalidCredentialsError);
  });

  test('incorrect password', async () => {
    await expect(() =>
      emailAuth({
        email: user.email,
        password: 'incorrectPassword',
      })
    ).rejects.toThrowError(InvalidCredentialsError);
  });
});
