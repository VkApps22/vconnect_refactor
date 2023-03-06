import ServiceError from './service-error';

export default class TargetUserNotFoundError extends ServiceError {
  constructor() {
    super(400, 'target-user-not-found');
  }
}
