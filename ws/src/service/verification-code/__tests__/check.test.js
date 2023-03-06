import moment from 'moment';
import { mongo } from '../../../config';
import { User } from '../../../domain/entity';
import checkVerificationCodeService from '../check';
import {
  EmailNotFoundError,
  ExpiredVerificationCodeError,
  InvalidVerificationCodeError,
} from '../../../domain/error';

const createUser = (verificationExpiresAt) =>
  User.create({
    email: 'user@email.com',
    name: 'user',
    preferredName: 'user',
    company: 'user co',
    country: 'Brazil',
    authProviderType: 'email',
    authProviderId: 'user@email.com',
    authProviderSecret: '123456',
    verificationCode: '123456',
    verificationExpiresAt:
      verificationExpiresAt || moment().add(3, 'hours').toDate(),
  });

describe('checkVerificationCode', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('happy day', async () => {
    await createUser();

    await checkVerificationCodeService({
      email: 'user@email.com',
      verificationCode: '123456',
    });

    const user = await User.findOne({
      authProviderType: 'email',
      authProviderId: 'user@email.com',
    }).lean();

    expect({ ...user, _id: undefined }).toStrictEqual({
      __v: 0,
      _id: undefined,
      email: 'user@email.com',
      name: 'user',
      preferredName: 'user',
      company: 'user co',
      country: 'Brazil',
      authProviderType: 'email',
      authProviderId: 'user@email.com',
      authProviderSecret: '123456',
      recentViewed: [],
      favorites: [],
    });
  });

  it('user not found', async () => {
    await expect(() =>
      checkVerificationCodeService({
        email: 'notfound@email.com',
        verificationCode: '123456',
      })
    ).rejects.toThrowError(EmailNotFoundError);
  });

  it('wrong verification code', async () => {
    await createUser();

    await expect(() =>
      checkVerificationCodeService({
        email: 'user@email.com',
        verificationCode: '7890123',
      })
    ).rejects.toThrowError(InvalidVerificationCodeError);
  });

  it('expired verification code', async () => {
    await createUser(moment().add(-3, 'hours').toDate());

    await expect(() =>
      checkVerificationCodeService({
        email: 'user@email.com',
        verificationCode: '123456',
      })
    ).rejects.toThrowError(ExpiredVerificationCodeError);
  });
});
