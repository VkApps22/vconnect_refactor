import ServiceError from './service-error';

export default class SessionRevokedOrExpiredError extends ServiceError {
  constructor() {
    super(400, 'session-revoked-or-expired');
  }
}
