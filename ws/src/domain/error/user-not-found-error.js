import ServiceError from './service-error';

export default class UserNotFoundError extends ServiceError {
  constructor() {
    super(400, 'user-not-found');
  }
}
