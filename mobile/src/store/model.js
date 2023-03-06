import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { modelService } from '../services';

export const fetch = createAsyncThunk(
  'model/fetch',
  async ({ language, text, filter, pagination }) => {
    return modelService.fetch({
      language,
      text,
      filter,
      pagination,
    });
  }
);

export const fetchDetails = createAsyncThunk(
  'model/fetchDetails',
  async ({ modelId, incognito }) => {
    return modelService.fetchDetails({
      modelId,
      incognito,
    });
  }
);

export const fetchImages = createAsyncThunk(
  'model/fetchImages',
  async ({ modelId }) => {
    return modelService.fetchImages({
      modelId,
    });
  }
);

export const fetchProducts = createAsyncThunk(
  'model/fetchProducts',
  async () => {
    return modelService.fetchProducts();
  }
);

export const fetchFilterOptions = createAsyncThunk(
  'model/fetchFilterOptions',
  async () => {
    return modelService.fetchFilterOptions();
  }
);

export const selector = (state) => state.model;

export const slice = createSlice({
  name: 'model',
  initialState: {
    items: [],
  },
  reducers: {
    reset: (state) => ({ ...state, items: [] }),
    refresh: (state) => ({ ...state, items: [], refreshing: true }),
  },
  extraReducers: {
    [fetch.pending]: (state) => {
      state.pending = true;
      state.errored = false;
    },
    [fetch.fulfilled]: (state, action) => {
      state.pending = false;
      state.refreshing = false;
      state.items = [...state.items, ...action.payload.items];
      state.total = action.payload.count;
    },
    [fetch.rejected]: (state) => {
      state.pending = false;
      state.refreshing = false;
      state.errored = true;
    },
    [fetchProducts.pending]: (state) => {
      state.pending = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.pending = false;
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state) => {
      state.pending = false;
    },
    [fetchFilterOptions.pending]: (state) => {
      state.pending = true;
    },
    [fetchFilterOptions.fulfilled]: (state, action) => {
      state.pending = false;
      state.filterOptions = action.payload;
    },
    [fetchFilterOptions.rejected]: (state) => {
      state.pending = false;
    },
    [fetchDetails.pending]: (state) => {
      state.pending = true;
    },
    [fetchDetails.fulfilled]: (state, action) => {
      state.pending = false;
      state.model = action.payload;
    },
    [fetchDetails.rejected]: (state) => {
      state.pending = false;
    },
    [fetchImages.pending]: (state) => {
      state.pendingImages = true;
    },
    [fetchImages.fulfilled]: (state, action) => {
      state.pendingImages = false;
      state.images = action.payload;
    },
    [fetchImages.rejected]: (state) => {
      state.pendingImages = false;
    },
  },
});

export default slice.reducer;
