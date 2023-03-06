import mongoose from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';
import create from '../create';
import facebookAuth from '../../auth/facebook-auth';
import linkedinAuth from '../../auth/linkedin-auth';
import emailAuth from '../../auth/email-auth';
import { InvalidAuthMethodError } from '../../../domain/error';
import { mongo } from '../../../config';

const mockResponse = {
  name: 'name',
  preferredName: 'name',
  email: 'email@email.com',
  company: 'company',
  phone: '',
  country: 'usa',
  state: '',
  expiresIn: new Date('2020-01-02T00:00:00.000Z'),
  userId: new mongoose.Types.ObjectId('5f5f3327a2ccead4c3e62c93'),
  lastAccessed: new Date('2020-01-02T00:00:00.000Z'),
};

jest.mock('jsonwebtoken');
const mockJsonWebToken = () =>
  jsonwebtoken.sign.mockImplementationOnce(() => 'JWT_TOKEN');

jest.mock('../../auth/facebook-auth');
jest.mock('../../auth/linkedin-auth');
jest.mock('../../auth/email-auth');

const mockFacebookAuth = () =>
  facebookAuth.mockImplementationOnce(() => mockResponse);
const mockLinkedinAuth = () =>
  linkedinAuth.mockImplementationOnce(() => mockResponse);
const mockEmailAuth = () =>
  emailAuth.mockImplementationOnce(() => mockResponse);

describe('createSession', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('email', async () => {
    mockEmailAuth();
    mockJsonWebToken();

    const response = await create({
      method: 'email',
      email: 'email',
      password: 'password',
    });

    expect(response).toStrictEqual({
      email: 'email@email.com',
      name: 'name',
      preferredName: 'name',
      company: 'company',
      phone: '',
      country: 'usa',
      state: '',
      language: undefined,
      token: 'JWT_TOKEN',
      lastAccessed: new Date('2020-01-02T00:00:00.000Z'),
      lastUpdated: undefined,
    });
  });

  it('facebook', async () => {
    mockFacebookAuth();
    mockJsonWebToken();

    const response = await create({
      method: 'facebook',
      token: 'token',
    });

    expect(response).toStrictEqual({
      email: 'email@email.com',
      name: 'name',
      preferredName: 'name',
      company: 'company',
      phone: '',
      country: 'usa',
      state: '',
      language: undefined,
      token: 'JWT_TOKEN',
      lastAccessed: new Date('2020-01-02T00:00:00.000Z'),
      lastUpdated: undefined,
    });
  });

  it('linkedin', async () => {
    mockLinkedinAuth();
    mockJsonWebToken();

    const response = await create({
      method: 'linkedin',
      token: 'token',
    });

    expect(response).toStrictEqual({
      email: 'email@email.com',
      name: 'name',
      preferredName: 'name',
      company: 'company',
      phone: '',
      country: 'usa',
      state: '',
      language: undefined,
      token: 'JWT_TOKEN',
      lastAccessed: new Date('2020-01-02T00:00:00.000Z'),
      lastUpdated: undefined,
    });
  });

  it('invalid', async () => {
    await expect(() =>
      create({ method: 'invalidMethod' })
    ).rejects.toThrowError(InvalidAuthMethodError);
  });
});
