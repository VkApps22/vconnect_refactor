import ServiceError from './service-error';

export default class BadAppleAuthError extends ServiceError {
  constructor() {
    super(502, 'bad-apple-auth');
  }
}
