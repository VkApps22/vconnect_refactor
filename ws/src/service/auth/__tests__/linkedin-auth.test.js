import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';
import linkedinAuth from '../linkedin-auth';
import { mongo } from '../../../config';
import { User } from '../../../domain/entity';

jest.mock('axios');
const mockLNResponse = (
  tokenCallResponse,
  dataCallResponse,
  contactCallResponse
) => {
  axios.post.mockImplementationOnce(() => ({ data: tokenCallResponse }));
  axios.get
    .mockImplementationOnce(() => ({ data: dataCallResponse }))
    .mockImplementationOnce(() => ({ data: contactCallResponse }));
};

jest.mock('jsonwebtoken');
const mockJsonWebToken = () =>
  jsonwebtoken.sign.mockImplementationOnce(() => 'JWT_TOKEN');

jest.mock('moment', () => () =>
  jest.requireActual('moment')('2020-01-01T00:00:00.000Z')
);

const tokenCallResponse = {
  access_token: 'longLivedAccessToken',
  expires_in: 5183944,
};

const dataCallResponse = {
  firstName: {
    localized: {
      en_US: 'Bob',
    },
    preferredLocale: {
      country: 'US',
      language: 'en',
    },
  },
  localizedFirstName: 'Bob',
  headline: {
    localized: {
      en_US: 'API Enthusiast at LinkedIn',
    },
    preferredLocale: {
      country: 'US',
      language: 'en',
    },
  },
  localizedHeadline: 'API Enthusiast at LinkedIn',
  vanityName: 'bsmith',
  id: 'id',
  lastName: {
    localized: {
      en_US: 'Smith',
    },
    preferredLocale: {
      country: 'US',
      language: 'en',
    },
  },
  localizedLastName: 'Smith',
  profilePicture: {
    displayImage: 'urn:li:digitalmediaAsset:C4D00AAAAbBCDEFGhiJ',
  },
};

const contactCallResponse = {
  elements: [
    {
      handle: 'urn:li:emailAddress:3775708763',
      'handle~': {
        emailAddress: 'email@email.com',
      },
      primary: true,
      type: 'EMAIL',
    },
    {
      handle: 'urn:li:phoneNumber:6146249836070047744',
      'handle~': {
        phoneNumber: {
          number: '158****1473',
        },
      },
      primary: true,
      type: 'PHONE',
    },
  ],
};

describe('linkedinAuth', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('happy day', async () => {
    mockJsonWebToken();
    mockLNResponse(tokenCallResponse, dataCallResponse, contactCallResponse);

    const response = await linkedinAuth({ token: 'TOKEN' });
    expect({
      ...response,
      userId: undefined,
      lastAccessed: undefined,
    }).toStrictEqual({
      name: 'Bob Smith',
      preferredName: 'Bob',
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
      authProviderType: 'linkedin',
      authProviderId: 'id',
    }).lean();
    expect({ ...user, _id: undefined, lastAccessed: undefined }).toStrictEqual({
      __v: 0,
      _id: undefined,
      name: 'Bob Smith',
      preferredName: 'Bob',
      company: '',
      phone: '',
      email: 'email@email.com',
      country: '',
      state: '',
      authProviderType: 'linkedin',
      authProviderId: 'id',
      authProviderSecret: 'longLivedAccessToken',
      lastAccessed: undefined,
      recentViewed: [],
      favorites: [],
    });
  });

  it('without email address', async () => {
    mockJsonWebToken();
    mockLNResponse(tokenCallResponse, dataCallResponse, {});

    const response = await linkedinAuth({ token: 'TOKEN' });
    expect({
      ...response,
      userId: undefined,
      lastAccessed: undefined,
    }).toStrictEqual({
      name: 'Bob Smith',
      preferredName: 'Bob',
      email: '',
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
      authProviderType: 'linkedin',
      authProviderId: 'id',
    }).lean();
    expect({ ...user, _id: undefined, lastAccessed: undefined }).toStrictEqual({
      __v: 0,
      _id: undefined,
      name: 'Bob Smith',
      preferredName: 'Bob',
      email: '',
      company: '',
      phone: '',
      country: '',
      state: '',
      authProviderType: 'linkedin',
      authProviderId: 'id',
      authProviderSecret: 'longLivedAccessToken',
      lastAccessed: undefined,
      favorites: [],
      recentViewed: [],
    });
  });
});
