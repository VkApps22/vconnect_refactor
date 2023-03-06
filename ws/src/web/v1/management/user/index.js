import Router from '@koa/router';
import fetch from './fetch';
import update from './update';

export default new Router().post('/user', fetch).patch('/user', update);
