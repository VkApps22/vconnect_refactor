import ServiceError from './service-error';

export default class EmailNotFoundError extends ServiceError {
  constructor() {
    super(400, 'email-not-found');
  }
}
