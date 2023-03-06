import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import auth from './auth';
import model from './model';
import stats from './stats';
import user from './user';
import analytics from './analytics';

const reducer = combineReducers({
  auth,
  model,
  stats,
  user,
  analytics,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
