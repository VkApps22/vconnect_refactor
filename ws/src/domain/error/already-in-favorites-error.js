import ServiceError from './service-error';

export default class AlreadyInFavoritesError extends ServiceError {
  constructor() {
    super(400, 'already-in-favorites');
  }
}
