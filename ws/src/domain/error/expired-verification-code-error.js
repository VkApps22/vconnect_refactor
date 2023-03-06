import ServiceError from './service-error';

export default class ExpiredVerificationCodeError extends ServiceError {
  constructor() {
    super(400, 'expired-verification-code');
  }
}
