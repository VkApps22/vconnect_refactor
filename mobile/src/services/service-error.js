export default class ServiceError extends Error {
  constructor(messageCode, innerException) {
    super(messageCode);

    this.messageCode = messageCode;
    this.innerException = innerException;
  }
}
