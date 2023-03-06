import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userService, verificationCodeService } from '../services';

export const sendVerificationCode = createAsyncThunk(
  'forgotPassword/sendVerificationCode',
  async ({ email }) => {
    return verificationCodeService.send({ email });
  }
);

export const checkVerificationCode = createAsyncThunk(
  'forgotPassword/checkVerificationCode',
  async ({ email, verificationCode }) => {
    return verificationCodeService.check({
      email,
      verificationCode,
    });
  }
);

export const changePassword = createAsyncThunk(
  'forgotPassword/changePassword',
  async ({ token, password }) => {
    return userService.changePassword({ token, password });
  }
);

const initialState = {
  email: '',
  pending: false,
  sent: false,
  token: '',
  checked: false,
  changed: false,
};

export const selector = (state) => state.forgotPassword;

export const slice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [sendVerificationCode.pending]: (state, action) => {
      state.pending = true;
      state.sent = false;
      state.email = action.meta.arg.email;
    },
    [sendVerificationCode.fulfilled]: (state) => {
      state.pending = false;
      state.sent = true;
    },
    [sendVerificationCode.rejected]: (state) => {
      state.pending = false;
      state.sent = false;
    },

    [checkVerificationCode.pending]: (state) => {
      state.pending = true;
      state.token = undefined;
      state.checked = false;
    },
    [checkVerificationCode.fulfilled]: (state, action) => {
      state.pending = false;
      state.token = action.payload.token;
      state.checked = true;
    },
    [checkVerificationCode.rejected]: (state) => {
      state.pending = false;
      state.token = undefined;
      state.checked = true;
    },

    [changePassword.pending]: (state) => {
      state.pending = true;
      state.changed = false;
    },
    [changePassword.fulfilled]: () => initialState,
    [changePassword.rejected]: (state) => {
      state.pending = false;
      state.changed = false;
    },
  },
});

export default slice.reducer;
