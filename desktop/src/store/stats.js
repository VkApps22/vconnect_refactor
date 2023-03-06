import { createSlice } from '@reduxjs/toolkit';

export const selector = (state) => state.stats;

const slice = createSlice({
  name: 'stats',
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export default slice.reducer;
