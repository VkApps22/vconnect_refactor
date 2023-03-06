import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sessionService, userService } from '../services';
import { setFavorites } from './offline';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ method, email, password, authorizationCode, redirectUri, data }) => {
    return sessionService.create({
      method,
      email,
      password,
      authorizationCode,
      redirectUri,
      data,
    });
  }
);

export const signUp = createAsyncThunk(
  'user/create',
  async ({
    email,
    name,
    preferredName,
    company,
    phone,
    country,
    state,
    password,
    language,
  }) => {
    return userService.create({
      email,
      name,
      preferredName,
      company,
      phone,
      country,
      state,
      password,
      language,
    });
  }
);

export const updateProfile = createAsyncThunk(
  'user/update',
  async ({
    name,
    preferredName,
    email,
    company,
    phone,
    country,
    state,
    language,
  }) => {
    return userService.update({
      name,
      preferredName,
      email,
      company,
      phone,
      country,
      state,
      language,
    });
  }
);

export const updateLanguage = createAsyncThunk(
  'user/update-language',
  async ({ language }) => {
    return userService.updateLanguage({
      language,
    });
  }
);

export const fetchRecentViewed = createAsyncThunk(
  'user/fetchRecentViewed',
  async () => {
    return userService.fetchRecentViewed();
  }
);

export const purgeProfile = createAsyncThunk('user/purge', async () => {
  return userService.purge();
});

export const signOut = createAsyncThunk(
  'auth/signOut',
  async ({ skipRevoke }) => {
    if (skipRevoke) return new Promise();
    return sessionService.revoke();
  }
);

export const fetchFavorites = createAsyncThunk(
  'user/favorites',
  async (_, { dispatch }) => {
    const favorites = await userService.fetchFavorites();
    dispatch(setFavorites({ favorites: favorites.favorites }));
    return favorites;
  }
);

export const toggleFavorite = createAsyncThunk(
  'user/toggleFavorite',
  async ({ modelId, remove }, { dispatch }) => {
    const favorites = remove
      ? await userService.removeFavorite({ modelId })
      : await userService.addFavorite({ modelId });
    dispatch(setFavorites({ favorites: favorites.favorites }));
    return favorites;
  }
);

export const fetchHasAlreadyLogged = createAsyncThunk(
  'session/fetchHasAlreadyLogged',
  async () => {
    return sessionService.fetchHasAlreadyLogged();
  }
);

export const restore = createAsyncThunk('session/restore', async () => {
  return sessionService.restore();
});

export const fetchHasSession = createAsyncThunk(
  'session/fetchHasSession',
  async () => {
    return sessionService.fetchHasSession();
  }
);

export const selector = (state) => state.auth;

const slice = createSlice({
  name: 'auth',
  initialState: {
    favorites: [],
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
      state.lastAccess = action.payload.lastAccess;
      state.lastUpdated = action.payload.lastUpdated;
      state.signedIn = true;
    },
    [signIn.rejected]: (state) => {
      state.pending = false;
    },

    [restore.pending]: (state) => {
      state.pending = true;
    },
    [restore.fulfilled]: (state, action) => {
      state.name = action.payload.name;
      state.preferredName = action.payload.preferredName;
      state.email = action.payload.email;
      state.company = action.payload.company;
      state.phone = action.payload.phone;
      state.country = action.payload.country;
      state.state = action.payload.state;
      state.language = action.payload.language;
      state.lastAccess = action.payload.lastAccess;
      state.lastUpdated = action.payload.lastUpdated;
      state.pending = false;
      state.signedIn = true;
    },
    [restore.rejected]: (state) => {
      state.pending = false;
    },

    [signUp.pending]: (state) => {
      state.pending = true;
    },

    [signUp.fulfilled]: (state) => {
      state.pending = false;
    },

    [signUp.rejected]: (state) => {
      state.pending = false;
    },

    [updateProfile.pending]: (state) => {
      state.pending = true;
    },

    [updateProfile.fulfilled]: (state, action) => {
      state.pending = false;
      state.name = action.meta.arg.name;
      state.preferredName = action.meta.arg.preferredName;
      state.email = action.meta.arg.email || state.email;
      state.company = action.meta.arg.company;
      state.phone = action.meta.arg.phone;
      state.country = action.meta.arg.country;
      state.state = action.meta.arg.state;
      state.language = action.meta.arg.language || state.language;
      state.lastUpdated = new Date();
    },

    [updateProfile.rejected]: (state) => {
      state.pending = false;
    },

    [updateLanguage.pending]: (state) => {
      state.pending = true;
    },

    [updateLanguage.fulfilled]: (state, action) => {
      state.pending = false;
      state.language = action.meta.arg.language;
    },

    [updateLanguage.rejected]: (state) => {
      state.pending = false;
    },

    [purgeProfile.pending]: (state) => {
      state.pending = true;
    },

    [purgeProfile.fulfilled]: (state) => {
      state.name = null;
      state.preferredName = null;
      state.email = null;
      state.company = null;
      state.phone = null;
      state.country = null;
      state.state = null;
      state.language = null;
      state.lastAccess = null;
      state.lastUpdated = null;
      state.pending = false;
      state.signedIn = false;
    },

    [purgeProfile.rejected]: (state) => {
      state.pending = false;
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
      state.lastAccess = null;
      state.lastUpdated = null;
      state.signedIn = false;
    },

    [signOut.rejected]: (state) => {
      state.pending = false;
      state.signedIn = false;
      state.name = null;
      state.preferredName = null;
      state.email = null;
      state.company = null;
      state.phone = null;
      state.country = null;
      state.state = null;
      state.language = null;
      state.lastAccess = null;
      state.lastUpdated = null;
    },

    [fetchRecentViewed.pending]: () => {},
    [fetchRecentViewed.fulfilled]: (state, action) => {
      state.recentViewed = action.payload.items;
    },
    [fetchRecentViewed.rejected]: () => {},

    [fetchFavorites.pending]: (state) => {
      state.pending = true;
    },
    [fetchFavorites.fulfilled]: (state, action) => {
      state.pending = false;
      state.favorites = action.payload.favorites;
    },
    [fetchFavorites.rejected]: (state) => {
      state.pending = false;
    },

    [toggleFavorite.pending]: () => {},
    [toggleFavorite.fulfilled]: (state, action) => {
      state.favorites = action.payload.favorites;
    },
    [toggleFavorite.rejected]: () => {},

    [fetchHasAlreadyLogged.pending]: (state) => {
      state.pendingStorage = true;
    },

    [fetchHasAlreadyLogged.fulfilled]: (state, action) => {
      state.pendingStorage = false;
      state.hasAlreadyLogged = action.payload;
    },

    [fetchHasAlreadyLogged.rejected]: (state) => {
      state.pendingStorage = false;
    },
  },
});

export default slice.reducer;
