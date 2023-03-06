import ServiceError from './service-error';

export default class ModelNotFoundError extends ServiceError {
  constructor() {
    super(400, 'item-not-found');
  }
}
