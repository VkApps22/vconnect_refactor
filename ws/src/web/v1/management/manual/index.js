import Router from '@koa/router';
import removeReview from './remove-review';

export default new Router().delete('/manual/review', removeReview);
