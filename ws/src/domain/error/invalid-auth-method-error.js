import ServiceError from './service-error';

export default class InvalidAuthMethodError extends ServiceError {
  constructor() {
    super(400, 'invalid-auth-method');
  }
}
