import ServiceError from './service-error';

export default class EmailAlreadyRegisteredError extends ServiceError {
  constructor() {
    super(400, 'email-already-registered');
  }
}
