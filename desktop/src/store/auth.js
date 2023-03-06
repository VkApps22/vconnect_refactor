import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sessionService } from '../services';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }) => {
    return sessionService.create({
      email,
      password,
    });
  }
);

export const restore = createAsyncThunk('auth/restore', async () => {
  return sessionService.restore();
});

export const signOut = createAsyncThunk(
  'auth/signOut',
  async ({ skipRevoke }) => {
    if (skipRevoke) return new Promise();
    return sessionService.revoke();
  }
);

export const selector = (state) => state.auth;

const slice = createSlice({
  name: 'auth',
  initialState: {
    restoring: true,
  },
  reducers: {},
  extraReducers: {
    [signIn.pending]: (state) => {
      state.pending = true;
    },
    [signIn.fulfilled]: (state, action) => {
      state.pending = false;
      state.name = action.payload.name;
      state.preferredName = action.payload.preferredName;
      state.email = action.payload.email;
      state.company = action.payload.company;
      state.phone = action.payload.phone;
      state.country = action.payload.country;
      state.state = action.payload.state;
      state.language = action.payload.language;
      state.signedIn = true;
    },
    [signIn.rejected]: (state) => {
      state.pending = false;
    },

    [restore.pending]: (state) => {
      state.restoring = true;
    },
    // eslint-disable-next-line sonarjs/no-identical-functions
    [restore.fulfilled]: (state, action) => {
      state.restoring = false;
      state.name = action.payload.name;
      state.preferredName = action.payload.preferredName;
      state.email = action.payload.email;
      state.company = action.payload.company;
      state.phone = action.payload.phone;
      state.country = action.payload.country;
      state.state = action.payload.state;
      state.language = action.payload.language;
      state.signedIn = true;
    },
    [restore.rejected]: (state) => {
      state.restoring = false;
    },

    [signOut.pending]: (state) => {
      state.pending = true;
    },

    [signOut.fulfilled]: (state) => {
      state.pending = false;
      state.name = null;
      state.preferredName = null;
      state.email = null;
      state.company = null;
      state.phone = null;
      state.country = null;
      state.state = null;
      state.language = null;
      state.signedIn = false;
    },

    [signOut.rejected]: (state) => {
      state.name = null;
      state.preferredName = null;
      state.email = null;
      state.company = null;
      state.phone = null;
      state.country = null;
      state.state = null;
      state.language = null;
      state.signedIn = false;
      state.pending = false;
    },
  },
});

export default slice.reducer;
