import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';
import { User } from '../../../domain/entity';
import facebookAuth from '../facebook-auth';
import { mongo } from '../../../config';

jest.mock('axios');
const mockFbResponse = (
  accessTokenResponse,
  longAccessTokenResponse,
  dataResponse
) =>
  axios.get
    .mockImplementationOnce(() => ({ data: accessTokenResponse }))
    .mockImplementationOnce(() => ({ data: longAccessTokenResponse }))
    .mockImplementationOnce(() => ({ data: dataResponse }));

jest.mock('jsonwebtoken');
const mockJsonWebToken = () =>
  jsonwebtoken.sign.mockImplementationOnce(() => 'JWT_TOKEN');

jest.mock('moment', () => () =>
  jest.requireActual('moment')('2020-01-01T00:00:00.000Z')
);

const accessTokenResponse = {
  access_token: 'longLivedAccessToken',
  token_type: 'bearer',
  expires_in: 5183944,
};

const longAccessTokenResponse = {
  access_token: 'longLivedAccessToken',
  token_type: 'bearer',
  expires_in: 5183944,
};

const dataResponse = {
  id: 'id',
  name: 'name',
  first_name: 'firstName',
  email: 'email@email.com',
  location: {
    location: {
      country: 'brazil',
    },
  },
};

describe('facebookAuth', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('happy day', async () => {
    mockJsonWebToken();
    mockFbResponse(accessTokenResponse, longAccessTokenResponse, dataResponse);

    const response = await facebookAuth({ token: 'TOKEN' });
    expect({
      ...response,
      userId: undefined,
      lastAccessed: undefined,
    }).toStrictEqual({
      name: 'name',
      preferredName: 'firstName',
      email: 'email@email.com',
      company: '',
      phone: '',
      country: 'brazil',
      state: '',
      expiresIn: new Date('2020-12-31T00:00:00.000Z'),
      language: undefined,
      userId: undefined,
      lastAccessed: undefined,
      lastUpdated: undefined,
    });

    const user = await User.findOne({
      authProviderType: 'facebook',
      authProviderId: 'id',
    }).lean();
    expect({
      ...user,
      _id: undefined,
      lastAccessed: undefined,
    }).toStrictEqual({
      __v: 0,
      _id: undefined,
      name: 'name',
      preferredName: 'firstName',
      email: 'email@email.com',
      company: '',
      phone: '',
      country: 'brazil',
      state: '',
      authProviderType: 'facebook',
      authProviderId: 'id',
      authProviderSecret: 'longLivedAccessToken',
      favorites: [],
      recentViewed: [],
      lastAccessed: undefined,
    });
  });

  it('user already existed', async () => {
    await User.create({
      name: 'name',
      preferredName: 'firstName',
      country: 'brazil',
      email: 'email@email.com',
      company: '',
      authProviderType: 'facebook',
      authProviderId: 'id',
      authProviderSecret: 'longLivedAccessToken',
    });

    mockJsonWebToken();
    mockFbResponse(accessTokenResponse, longAccessTokenResponse, {
      id: 'id',
      name: 'new name',
      first_name: 'new firstName',
      email: 'new-email@email.com',
      location: {
        location: {
          country: 'usa',
        },
      },
    });

    const response = await facebookAuth({ token: 'TOKEN' });
    expect({
      ...response,
      userId: undefined,
      lastAccessed: undefined,
    }).toStrictEqual({
      name: 'name',
      preferredName: 'firstName',
      email: 'email@email.com',
      company: '',
      phone: undefined,
      country: 'brazil',
      state: undefined,
      expiresIn: new Date('2020-12-31T00:00:00.000Z'),
      language: undefined,
      userId: undefined,
      lastAccessed: undefined,
      lastUpdated: undefined,
    });

    const user = await User.findOne({
      authProviderType: 'facebook',
      authProviderId: 'id',
    }).lean();
    expect({ ...user, _id: undefined, lastAccessed: undefined }).toStrictEqual({
      __v: 0,
      _id: undefined,
      name: 'name',
      preferredName: 'firstName',
      email: 'email@email.com',
      company: '',
      country: 'brazil',
      authProviderType: 'facebook',
      authProviderId: 'id',
      authProviderSecret: 'longLivedAccessToken',
      recentViewed: [],
      favorites: [],
      lastAccessed: undefined,
    });
  });

  it('undefined location 1', async () => {
    mockJsonWebToken();
    mockFbResponse(accessTokenResponse, longAccessTokenResponse, {
      id: 'id',
      name: 'name',
      first_name: 'firstName',
      email: 'email@email.com',
    });

    const response = await facebookAuth({ token: 'TOKEN' });
    expect({
      ...response,
      userId: undefined,
      lastAccessed: undefined,
    }).toStrictEqual({
      name: 'name',
      preferredName: 'firstName',
      email: 'email@email.com',
      company: '',
      phone: '',
      country: '',
      state: '',
      expiresIn: new Date('2020-12-31T00:00:00.000Z'),
      language: undefined,
      userId: undefined,
      lastAccessed: undefined,
      lastUpdated: undefined,
    });

    const user = await User.findOne({
      authProviderType: 'facebook',
      authProviderId: 'id',
    }).lean();
    expect({ ...user, _id: undefined, lastAccessed: undefined }).toStrictEqual({
      __v: 0,
      _id: undefined,
      name: 'name',
      preferredName: 'firstName',
      email: 'email@email.com',
      company: '',
      phone: '',
      country: '',
      state: '',
      authProviderType: 'facebook',
      authProviderId: 'id',
      authProviderSecret: 'longLivedAccessToken',
      favorites: [],
      recentViewed: [],
      lastAccessed: undefined,
    });
  });

  it('undefined location 2', async () => {
    mockJsonWebToken();
    mockFbResponse(accessTokenResponse, longAccessTokenResponse, {
      id: 'id',
      name: 'name',
      first_name: 'firstName',
      email: 'email@email.com',
      location: {},
    });

    const response = await facebookAuth({ token: 'TOKEN' });
    expect({
      ...response,
      userId: undefined,
      lastAccessed: undefined,
    }).toStrictEqual({
      name: 'name',
      preferredName: 'firstName',
      email: 'email@email.com',
      company: '',
      phone: '',
      country: '',
      state: '',
      expiresIn: new Date('2020-12-31T00:00:00.000Z'),
      language: undefined,
      userId: undefined,
      lastAccessed: undefined,
      lastUpdated: undefined,
    });

    const user = await User.findOne({
      authProviderType: 'facebook',
      authProviderId: 'id',
    }).lean();
    expect({ ...user, _id: undefined, lastAccessed: undefined }).toStrictEqual({
      __v: 0,
      _id: undefined,
      name: 'name',
      preferredName: 'firstName',
      company: '',
      phone: '',
      country: '',
      state: '',
      email: 'email@email.com',
      authProviderType: 'facebook',
      authProviderId: 'id',
      authProviderSecret: 'longLivedAccessToken',
      lastAccessed: undefined,
      favorites: [],
      recentViewed: [],
    });
  });
});
