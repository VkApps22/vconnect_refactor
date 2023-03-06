import ServiceError from './service-error';

export default class InvalidVerificationCodeError extends ServiceError {
  constructor() {
    super(400, 'invalid-verification-code');
  }
}
