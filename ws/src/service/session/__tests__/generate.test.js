import mongoose from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';
import generate from '../generate';
import { mongo } from '../../../config';

jest.mock('jsonwebtoken');
const mockJsonWebToken = () =>
  jsonwebtoken.sign.mockImplementationOnce(() => 'JWT_TOKEN');

describe('generateSession', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('happy day', async () => {
    mockJsonWebToken();

    const response = await generate({
      userId: new mongoose.Types.ObjectId('5f5f3327a2ccead4c3e62c93'),
      expiresIn: 1000,
    });

    expect({ ...response, _id: undefined }).toStrictEqual({
      __v: 0,
      _id: undefined,
      userId: new mongoose.Types.ObjectId('5f5f3327a2ccead4c3e62c93'),
      expiresIn: new Date(1000),
      revoked: false,
      token: 'JWT_TOKEN',
    });
  });
});
