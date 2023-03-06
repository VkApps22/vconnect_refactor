import Router from '@koa/router';
import add, { addFormFields } from './add';
import update from './update';
import remove from './remove';
import fetch from './fetch';
import fetchOverview from './fetch-overview';
import fetchCommentsOverview from './fetch-comments-overview';
import fetchComments from './fetch-comments';
import fetchSuggestions from './fetch-suggestions';
import fetchFamilySuggestions from './fetch-family-suggestions';
import fetchImages from './fetch-images';
import fetchManuals from './fetch-manuals';
import fetchDetails from './fetch-details';

export default new Router()
  .post('/models', fetch)
  .get('/models', fetchOverview)
  .post('/model', addFormFields, add)
  .patch('/model', addFormFields, update)
  .get('/model', fetchDetails)
  .delete('/model', remove)
  .post('/model/comment', fetchComments)
  .get('/model/images', fetchImages)
  .get('/model/manuals', fetchManuals)
  .get('/model/comments', fetchCommentsOverview)
  .get('/models/suggestions', fetchSuggestions)
  .get('/models/families/suggestions', fetchFamilySuggestions);
