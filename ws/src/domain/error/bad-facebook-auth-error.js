import ServiceError from './service-error';

export default class BadFacebookAuthError extends ServiceError {
  constructor() {
    super(502, 'bad-facebook-auth');
  }
}
