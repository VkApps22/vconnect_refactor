import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import auth from './auth';
import forgotPassword from './forgot-password';
import model from './model';
import contact from './contact';
import manual from './manual';
import offline from './offline';

const reducer = combineReducers({
  auth,
  forgotPassword,
  model,
  contact,
  manual,
  offline,
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
