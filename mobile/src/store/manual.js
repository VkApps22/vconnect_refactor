import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { manualService } from '../services';

export const fetch = createAsyncThunk('manual/fetch', async ({ manualId }) => {
  return manualService.fetch({
    manualId,
  });
});

export const addReview = createAsyncThunk(
  'manual/addReview',
  async ({ manualId, rating, comment }) => {
    return manualService.addReview({
      manualId,
      rating,
      comment,
    });
  }
);

export const download = createAsyncThunk(
  'manual/download',
  async ({ manualId }) => {
    return manualService.download({
      manualId,
    });
  }
);

export const selector = (state) => state.manual;

export const slice = createSlice({
  name: 'manual',
  initialState: {},
  reducers: {
    reset: () => ({}),
  },
  extraReducers: {
    [fetch.pending]: (state) => {
      state.pending = true;
      state.errored = false;
    },
    [fetch.fulfilled]: (state, action) => {
      state.pending = false;
      state.manual = action.payload;
    },
    [fetch.rejected]: (state) => {
      state.pending = false;
      state.errored = true;
    },
    [download.pending]: (state) => {
      state.pending = true;
      state.errored = false;
    },
    [download.fulfilled]: (state) => {
      state.pending = false;
    },
    [download.rejected]: (state) => {
      state.pending = false;
      state.errored = true;
    },
    [addReview.pending]: (state) => {
      state.pending = true;
    },
    [addReview.fulfilled]: (state) => {
      state.pending = false;
    },
    [addReview.rejected]: (state) => {
      state.pending = false;
    },
  },
});

export default slice.reducer;
