import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { modelService } from '../services';

export const add = createAsyncThunk(
  'model/add',
  async ({
    model,
    codePattern,
    augmentifyId,
    name,
    family,
    manual,
    description,
    playlist,
    images,
    thumbnail,
    enManualFile,
    ptManualFile,
    esManualFile,
  }) => {
    return modelService.add({
      model,
      codePattern,
      augmentifyId,
      name,
      family,
      manual,
      description,
      playlist,
      images,
      thumbnail,
      enManualFile,
      ptManualFile,
      esManualFile,
    });
  }
);

export const update = createAsyncThunk(
  'model/update',
  async ({
    id,
    model,
    codePattern,
    augmentifyId,
    name,
    family,
    manual,
    description,
    playlist,
    images,
    thumbnail,
    enManualFileChanged,
    ptManualFileChanged,
    esManualFileChanged,
    enManualFile,
    ptManualFile,
    esManualFile,
  }) => {
    return modelService.update({
      id,
      model,
      codePattern,
      augmentifyId,
      name,
      family,
      manual,
      description,
      playlist,
      images,
      thumbnail,
      enManualFileChanged,
      ptManualFileChanged,
      esManualFileChanged,
      enManualFile,
      ptManualFile,
      esManualFile,
    });
  }
);

export const remove = createAsyncThunk('model/remove', async ({ id }) => {
  return modelService.remove({
    id,
  });
});

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

export const fetchOverview = createAsyncThunk('model/fetchOverview', () => {
  return modelService.fetchOverview();
});

export const fetchSuggestions = createAsyncThunk(
  'model/fetchSuggestions',
  async ({ language, query }) => {
    return modelService.fetchSuggestions({
      language,
      query,
    });
  }
);

export const fetchFamilySuggestions = createAsyncThunk(
  'model/fetchFamilySuggestions',
  async ({ language, query }) => {
    return modelService.fetchFamilySuggestions({
      language,
      query,
    });
  }
);

export const fetchDetails = createAsyncThunk(
  'model/fetchDetails',
  async ({ id }) => {
    return modelService.fetchDetails({
      id,
    });
  }
);

export const fetchImages = createAsyncThunk(
  'model/fetchImages',
  async ({ id }) => {
    return modelService.fetchImages({
      id,
    });
  }
);

export const fetchManuals = createAsyncThunk(
  'model/fetchManuals',
  async ({ id }) => {
    return modelService.fetchManuals({
      id,
    });
  }
);

export const fetchComments = createAsyncThunk(
  'model/fetchComments',
  async ({ modelId, language, pagination }) => {
    return modelService.fetchComments({
      modelId,
      language,
      pagination,
    });
  }
);

export const fetchCommentsOverview = createAsyncThunk(
  'model/fetchCommentsOverview',
  async ({ modelId, language }) => {
    return modelService.fetchCommentsOverview({
      modelId,
      language,
    });
  }
);

export const selector = (state) => state.model;

const slice = createSlice({
  name: 'model',
  initialState: {
    items: [],
    refreshCounter: 0,
    overview: {
      productCount: 0,
      familyCount: 0,
      modelCount: 0,
      lastUpdated: undefined,
    },
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
    },
    [fetch.rejected]: (state) => {
      state.pending = false;
    },
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
    [add.pending]: (state) => {
      state.submitting = true;
    },
    [add.fulfilled]: (state) => {
      state.submitting = false;
    },
    [add.rejected]: (state) => {
      state.submitting = false;
    },
    [update.pending]: (state) => {
      state.submitting = true;
    },
    [update.fulfilled]: (state) => {
      state.refreshCounter += 1;
      state.submitting = false;
    },
    [update.rejected]: (state) => {
      state.submitting = false;
    },
    [remove.pending]: () => {},
    [remove.fulfilled]: (state) => {
      state.refreshCounter += 1;
    },
    [remove.rejected]: () => {},
  },
});

export default slice.reducer;
