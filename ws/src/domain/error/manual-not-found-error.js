import ServiceError from './service-error';

export default class ManualNotFoundError extends ServiceError {
  constructor() {
    super(400, 'manual-not-found');
  }
}
