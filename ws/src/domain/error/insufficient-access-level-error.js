import ServiceError from './service-error';

export default class InsufficientAccessLevelError extends ServiceError {
  constructor() {
    super(403, 'insufficient-access-level');
  }
}
