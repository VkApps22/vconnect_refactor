import cryptoRandomString from 'crypto-random-string';
import { sendVerificationCodeService } from '..';
import { User } from '../../../domain/entity';
import { EmailNotFoundError } from '../../../domain/error';
import { mongo } from '../../../config';
import { sendEmailService } from '../../email';

jest.mock('../../email/send');
jest.mock('moment', () => () =>
  jest.requireActual('moment')('2020-01-01T00:00:00.000Z')
);
jest.mock('crypto-random-string');
const mockCryptoRandomString = () =>
  cryptoRandomString.mockImplementationOnce(() => '717474');

describe('sendVerificationCode', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('happy day', async () => {
    mockCryptoRandomString();

    await User.create({
      email: 'user@email.com',
      name: 'user',
      preferredName: 'user',
      company: 'user co',
      country: 'Brazil',
      language: 'en',
      authProviderType: 'email',
      authProviderId: 'user@email.com',
      authProviderSecret: '123456',
      verificationCode: undefined,
      verificationExpiresAt: undefined,
    });

    await sendVerificationCodeService({
      email: 'user@email.com',
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
      language: 'en',
      authProviderType: 'email',
      authProviderId: 'user@email.com',
      authProviderSecret: '123456',
      verificationCode: '717474',
      verificationExpiresAt: new Date('2020-01-01T01:00:00.000Z'),
      recentViewed: [],
      favorites: [],
    });

    expect(sendEmailService).toBeCalledWith({
      to: 'user@email.com',
      subject: 'VConnect – Platform Password Reset',
      body: `Hello, user
<p>Someone requested that the password for your VConnect - Platform account be reset.
<p>Please use the following verification code to reset your password:</p>
<b>717474</b>
<p>This verification code is good until the next hour and can be only used once.</p>
<p>If you didn't request this, you can ignore this email or let us know. Your password won't change until you create a new password.</p>
<p>Thanks,</p>
<p>VConnect - Platform Team</p>`,
    });
  });

  it('user not found', async () => {
    await expect(() =>
      sendVerificationCodeService({
        email: 'invalidUser@email.com',
      })
    ).rejects.toThrowError(EmailNotFoundError);
  });
});
