import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  registerUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export const registerUserThunk = createAsyncThunk(
  'users/registerUser',
  ({ email, name, password }: TRegisterData) =>
    registerUserApi({ email, name, password })
);

export const loginUserThunk = createAsyncThunk(
  'users/loginUser',
  ({ email, password }: TLoginData) => loginUserApi({ email, password })
);

export const getUserThunk = createAsyncThunk('users/getUser', () =>
  getUserApi()
);

export type TUserState = {
  isLoading: boolean;
  user: TUser | null;
  error: string | undefined;
  accessToken: string | null;
  refreshToken: string | null;
  success: boolean;
};

const initialState: TUserState = {
  isLoading: false,
  user: null,
  error: undefined,
  accessToken: null,
  refreshToken: null,
  success: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => {
      state;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUserThunk.fulfilled, (state) => {
      state.isLoading = false;
    });

    builder.addCase(registerUserThunk.pending, (state) => {
      state.isLoading = true;
      state.accessToken = null;
      state.refreshToken = null;
      state.success = false;
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.success = false;
      state.error = action.error.code;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.success = true;
      state.error = undefined;
    });

    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true;
      state.accessToken = null;
      state.refreshToken = null;
      state.success = false;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.success = false;
      state.error = action.error.code;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.success = true;
      state.error = undefined;
    });
  }
});

export const { selectUser } = userSlice.selectors;

export default userSlice.reducer;
