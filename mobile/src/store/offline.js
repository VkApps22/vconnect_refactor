import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { manualService, offlineService, modelService } from '../services';

export const addPack = createAsyncThunk(
  'offline/addPack',
  async ({ modelId }, { getState }) => {
    const { auth } = getState();
    const model = await modelService.fetchDetails({
      modelId,
      incognito: true,
    });
    const images = await modelService.fetchImages({ modelId });
    const manualRef = model.manual.find(
      ({ language }) => language === auth.language
    );
    const manualId = manualRef ? manualRef.value : model.manual[0].value;
    const manual = await manualService.fetch({ manualId });
    const manualUri = await manualService.downloadDirect({
      manualId,
    });
    await offlineService.addPack({ model, images, manual, manualUri });
  }
);

export const removePack = createAsyncThunk(
  'offline/removePack',
  async ({ modelId }) => {
    return offlineService.removePack({ modelId });
  }
);

export const fetchFavorites = createAsyncThunk(
  'offline/fetchFavorites',
  async () => {
    return offlineService.fetchFavorites();
  }
);

export const syncPacks = createAsyncThunk(
  'offline/syncPacks',
  async ({ favorites }, { dispatch }) => {
    let availablePacks = await offlineService.fetchAvailablePacks();
    const favoritesIds = favorites.map((favorite) => favorite._id);

    const removedFavorites = availablePacks.filter(
      (availablePackId) => !favoritesIds.includes(availablePackId)
    );
    await Promise.all(
      removedFavorites.map((modelId) => dispatch(removePack({ modelId })))
    );

    availablePacks = await offlineService.fetchAvailablePacks();
    const addedFavorites = favoritesIds.filter(
      (favoriteId) => !availablePacks.includes(favoriteId)
    );

    // eslint-disable-next-line no-restricted-syntax
    for (const addedFavorite of addedFavorites) {
      // eslint-disable-next-line no-await-in-loop
      await dispatch(addPack({ modelId: addedFavorite }));
    }
  }
);

export const setFavorites = createAsyncThunk(
  'offline/setFavorites',
  async ({ favorites }, { dispatch }) => {
    dispatch(syncPacks({ favorites }));
    return offlineService.setFavorites({ favorites });
  }
);

export const fetchPack = createAsyncThunk(
  'offline/fetchPack',
  async ({ modelId }) => {
    return offlineService.fetchPack({ modelId });
  }
);

export const fetchAvailablePacks = createAsyncThunk(
  'offline/fetchAvailablePacks',
  async () => {
    return offlineService.fetchAvailablePacks();
  }
);

export const selector = (state) => state.offline;

const slice = createSlice({
  name: 'offline',
  initialState: {
    favorites: [],
    availablePacks: [],
  },
  reducers: {},
  extraReducers: {
    [addPack.pending]: (state) => {
      state.pending = true;
    },
    [addPack.fulfilled]: (state) => {
      state.pending = false;
    },
    [addPack.rejected]: (state) => {
      state.pending = false;
    },
    [removePack.pending]: (state) => {
      state.pending = true;
    },
    [removePack.fulfilled]: (state) => {
      state.pending = false;
    },
    [removePack.rejected]: (state) => {
      state.pending = false;
    },
    [fetchPack.pending]: (state) => {
      state.pending = true;
    },
    [fetchPack.fulfilled]: (state, action) => {
      state.pending = false;
      state.model = action.payload.model;
      state.images = action.payload.images;
      state.manual = action.payload.manual;
      state.manualUri = action.payload.manualUri;
    },
    [fetchPack.rejected]: (state) => {
      state.pending = false;
    },
    [fetchFavorites.pending]: (state) => {
      state.pending = true;
    },
    [fetchFavorites.fulfilled]: (state, action) => {
      state.pending = false;
      state.favorites = action.payload;
    },
    [fetchFavorites.rejected]: (state) => {
      state.pending = false;
    },
    [setFavorites.pending]: (state) => {
      state.pending = true;
    },
    [setFavorites.fulfilled]: (state) => {
      state.pending = false;
    },
    [setFavorites.rejected]: (state) => {
      state.pending = false;
    },
    [fetchAvailablePacks.pending]: (state) => {
      state.pending = true;
    },
    [fetchAvailablePacks.fulfilled]: (state, action) => {
      state.pending = false;
      state.availablePacks = action.payload;
    },
    [fetchAvailablePacks.rejected]: (state) => {
      state.pending = false;
    },
  },
});

export default slice.reducer;
