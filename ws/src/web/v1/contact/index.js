import Router from '@koa/router';
import fetch from './fetch';

export default new Router().get('/contacts', fetch);
