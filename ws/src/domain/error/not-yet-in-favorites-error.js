import ServiceError from './service-error';

export default class NotYetInFavoritesError extends ServiceError {
  constructor() {
    super(400, 'not-yet-in-favorites');
  }
}
