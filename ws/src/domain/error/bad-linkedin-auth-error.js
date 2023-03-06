import ServiceError from './service-error';

export default class BadLinkedinAuthError extends ServiceError {
  constructor() {
    super(502, 'bad-linkedin-auth');
  }
}
