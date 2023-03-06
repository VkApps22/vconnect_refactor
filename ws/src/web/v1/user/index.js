import Router from '@koa/router';
import changePassword from './change-password';
import create from './create';
import update from './update';
import updateLanguage from './update-language';
import purge from './purge';
import fetchRecentViewed from './fetch-recent-viewed';
import addFavorite from './add-favorite';
import removeFavorite from './remove-favorite';
import fetchFavorites from './fetch-favorites';

export default new Router()
  .post('/public/user', create)
  .get('/user/models', fetchRecentViewed)
  .patch('/user', update)
  .patch('/user/language', updateLanguage)
  .delete('/user', purge)
  .post('/user/password', changePassword)
  .post('/user/favorites', addFavorite)
  .delete('/user/favorites', removeFavorite)
  .get('/user/favorites', fetchFavorites);
