import ServiceError from './service-error';

export default class InvalidCredentialsError extends ServiceError {
  constructor() {
    super(400, 'incorrect-email-or-password');
  }
}
