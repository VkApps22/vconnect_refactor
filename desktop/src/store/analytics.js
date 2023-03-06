import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { analyticsService } from '../services';

export const fetchOverview = createAsyncThunk(
  'analytics/fetchOverview',
  async () => {
    return analyticsService.fetchOverview();
  }
);

export const fetchMostViewedProducts = createAsyncThunk(
  'analytics/fetchMostViewedProducts',
  async ({ period, date }) => {
    return analyticsService.fetchMostViewedProducts({
      period,
      date,
    });
  }
);

export const fetchMostViewedFamilies = createAsyncThunk(
  'analytics/fetchMostViewedFamilies',
  async ({ product, period, date }) => {
    return analyticsService.fetchMostViewedFamilies({
      product,
      period,
      date,
    });
  }
);

export const fetchMostViewedModels = createAsyncThunk(
  'analytics/fetchMostViewedModels',
  async ({ family, period, date }) => {
    return analyticsService.fetchMostViewedModels({
      family,
      period,
      date,
    });
  }
);

export const fetchMostPopularStates = createAsyncThunk(
  'analytics/fetchMostPopularStates',
  async () => {
    return analyticsService.fetchMostPopularStates();
  }
);

export const selector = (state) => state.analytics;

const slice = createSlice({
  name: 'analytics',
  initialState: {
    overview: {
      monthlyMostViewedProduct: {},
      monthlyMostViewedFamily: {},
      monthlyMostViewedModel: {},
      mostPopularState: {},
    },
    mostViewedProducts: [],
    mostViewedFamilies: [],
    mostViewedModels: [],
    mostPopularStates: [],
  },
  reducers: {},
  extraReducers: {
    [fetchOverview.pending]: (state) => {
      state.pending = true;
    },
    [fetchOverview.fulfilled]: (state, action) => {
      state.pending = false;
      state.overview = action.payload;
    },
    [fetchOverview.rejected]: (state) => {
      state.pending = false;
    },

    [fetchMostViewedProducts.pending]: (state) => {
      state.pending = true;
    },
    [fetchMostViewedProducts.fulfilled]: (state, action) => {
      state.pending = false;
      state.mostViewedProducts = action.payload;
    },
    [fetchMostViewedProducts.rejected]: (state) => {
      state.pending = false;
    },

    [fetchMostViewedFamilies.pending]: (state) => {
      state.pending = true;
    },
    [fetchMostViewedFamilies.fulfilled]: (state, action) => {
      state.pending = false;
      state.mostViewedFamilies = action.payload;
    },
    [fetchMostViewedFamilies.rejected]: (state) => {
      state.pending = false;
    },

    [fetchMostViewedModels.pending]: (state) => {
      state.pending = true;
    },
    [fetchMostViewedModels.fulfilled]: (state, action) => {
      state.pending = false;
      state.mostViewedModels = action.payload;
    },
    [fetchMostViewedModels.rejected]: (state) => {
      state.pending = false;
    },

    [fetchMostPopularStates.pending]: (state) => {
      state.pending = true;
    },
    [fetchMostPopularStates.fulfilled]: (state, action) => {
      state.pending = false;
      state.mostPopularStates = action.payload;
    },
    [fetchMostPopularStates.rejected]: (state) => {
      state.pending = false;
    },
  },
});

export default slice.reducer;
