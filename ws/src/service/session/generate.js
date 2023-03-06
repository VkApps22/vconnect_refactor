import mongoose from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';
import { Session } from '../../domain/entity';
import { env } from '../../config';

export default async ({ userId, expiresIn }) => {
  const sessionId = new mongoose.Types.ObjectId();
  const jwtToken = jsonwebtoken.sign({ sessionId }, env.JWT_SHARED_KEY);

  const session = await Session.create({
    _id: sessionId,
    userId,
    token: jwtToken,
    revoked: false,
    expiresIn,
  });

  return session.toObject();
};
