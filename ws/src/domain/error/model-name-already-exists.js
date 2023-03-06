import ServiceError from './service-error';

export default class ModelNameAlreadyExists extends ServiceError {
  constructor() {
    super(400, 'model-name-already-exists');
  }
}
