import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { contactService } from '../services';

export const fetch = createAsyncThunk(
  'contact/fetch',
  async ({ language, country, state }) => {
    return contactService.fetch({
      language,
      country,
      state,
    });
  }
);

export const selector = (state) => state.contact;

const slice = createSlice({
  name: 'contact',
  initialState: {
    contacts: [],
  },
  reducers: {},
  extraReducers: {
    [fetch.pending]: (state) => {
      state.pending = true;
    },
    [fetch.fulfilled]: (state, action) => {
      state.pending = false;
      state.contacts = action.payload;
    },
    [fetch.rejected]: (state) => {
      state.pending = false;
    },
  },
});

export default slice.reducer;
