import mongoose from 'mongoose';
import moment from 'moment';
import revoke from '../revoke';
import { mongo } from '../../../config';
import { Session } from '../../../domain/entity';
import {
  InvalidSessionError,
  SessionRevokedOrExpiredError,
} from '../../../domain/error';

describe('revokeSession', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('happy day', async () => {
    const sessionData = {
      token: 'JWT_TOKEN',
      revoked: false,
      expiresIn: moment().add(1, 'days').toDate(),
    };
    const session = await Session.create(sessionData);
    await revoke({ sessionId: session._id });

    const result = await Session.findById(session._id).lean();
    expect({ ...result, _id: undefined }).toStrictEqual({
      ...sessionData,
      __v: 0,
      _id: undefined,
      revoked: true,
    });
  });

  it('session not found', async () => {
    await expect(() =>
      revoke({ sessionId: new mongoose.Types.ObjectId() })
    ).rejects.toThrowError(InvalidSessionError);
  });

  it('session already revoked', async () => {
    const sessionData = {
      token: 'JWT_TOKEN',
      revoked: true,
      expiresIn: moment().add(1, 'days').toDate(),
    };
    const session = await Session.create(sessionData);

    await expect(() => revoke({ sessionId: session._id })).rejects.toThrowError(
      SessionRevokedOrExpiredError
    );
  });

  it('session expired', async () => {
    const sessionData = {
      token: 'JWT_TOKEN',
      revoked: false,
      expiresIn: moment().add(-1, 'days').toDate(),
    };
    const session = await Session.create(sessionData);

    await expect(() => revoke({ sessionId: session._id })).rejects.toThrowError(
      SessionRevokedOrExpiredError
    );
  });
});
