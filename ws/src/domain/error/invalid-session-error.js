import ServiceError from './service-error';

export default class InvalidSessionError extends ServiceError {
  constructor() {
    super(400, 'invalid-session');
  }
}
