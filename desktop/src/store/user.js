import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userService } from '../services';

export const fetch = createAsyncThunk(
  'user/fetch',
  async ({ text, companyDomain, pagination }) => {
    return userService.fetch({
      text,
      companyDomain,
      pagination,
    });
  }
);

export const toggleAdmin = createAsyncThunk(
  'user/update',
  async ({ id, remove }) => {
    return userService.update({
      targetUserId: id,
      accessLevel: remove ? 0 : 1,
    });
  }
);

export const selector = (state) => state.user;

const slice = createSlice({
  name: 'user',
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: {
    [fetch.pending]: (state) => {
      state.pending = true;
    },
    [fetch.fulfilled]: (state, action) => {
      state.pending = false;
      state.items = action.payload.items;
      state.total = action.payload.count;
      state.fetchingRequired = false;
    },
    [fetch.rejected]: (state) => {
      state.pending = false;
      state.fetchingRequired = false;
    },

    [toggleAdmin.pending]: (state) => {
      state.fetchingRequired = false;
    },
    [toggleAdmin.fulfilled]: (state) => {
      state.fetchingRequired = true;
    },
    [toggleAdmin.rejected]: (state) => {
      state.fetchingRequired = false;
    },
  },
});

export default slice.reducer;
