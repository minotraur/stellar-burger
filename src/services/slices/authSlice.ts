import {
  TLoginData,
  TRegisterData,
  fetchWithRefresh,
  forgotPasswordApi,
  loginUserApi,
  refreshToken,
  registerUserApi,
  resetPasswordApi
} from '@api';
import {
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

// Работа с токенами
export const refreshTokenThunk = createAsyncThunk(
  'auth/refreshToken',
  async () => await refreshToken()
);

interface IFetchWithRefreshParams {
  url: RequestInfo;
  options: RequestInit;
}

export const fetchWithRefreshThunk = createAsyncThunk(
  'auth/fetchWithRefresh',
  async (params: IFetchWithRefreshParams) => {
    const { url, options } = params;
    return await fetchWithRefresh(url, options);
  }
);
////////////////////////////////////////////////////////

// Авторизация пользователя
export const registerUserThunk = createAsyncThunk(
  'auth/registerUser',
  async (params: TRegisterData) => {
    const { email, name, password } = params;
    return await registerUserApi({ email, name, password });
  }
);

export const loginUserThunk = createAsyncThunk(
  'auth/loginUser',
  async (params: TLoginData) => {
    const { email, password } = params;
    return await loginUserApi({ email, password });
  }
);

interface IForgotPasswordApiParams {
  email: string;
}

export const forgotPasswordApiThunk = createAsyncThunk(
  'auth/forgotPassword',
  async (params: IForgotPasswordApiParams) => {
    const { email } = params;
    return await forgotPasswordApi({ email });
  }
);

interface IResetPasswordApiParams {
  password: string;
  token: string;
}

export const resetPasswordApiThunk = createAsyncThunk(
  'auth/resetPassword',
  async (params: IResetPasswordApiParams) => {
    const { password, token } = params;
    return await resetPasswordApi({ password, token });
  }
);
////////////////////////////////////////////////////////

type TAuthState = {
  isLoading: boolean;
  error: SerializedError | null;
  accessToken: string | null;
  refreshToken: string | null;
  success: boolean;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
};

const initialState: TAuthState = {
  isLoading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
  success: false,
  isAuthChecked: false,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    // Регистрация
    builder.addCase(registerUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.success = false;
      state.isAuthenticated = false;
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.error;
      state.accessToken = null;
      state.refreshToken = null;
      state.success = false;
      state.isAuthenticated = false;
    });
    builder.addCase(registerUserThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.success = true;
      state.isAuthenticated = false;
    });

    // Логин
    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.success = false;
      state.isAuthenticated = false;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.error;
      state.accessToken = null;
      state.refreshToken = null;
      state.success = false;
      state.isAuthenticated = false;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.success = true;
      state.isAuthenticated = true;
    });

    // Забыл пароль
    builder.addCase(forgotPasswordApiThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.success = false;
      state.isAuthenticated = false;
    });
    builder.addCase(forgotPasswordApiThunk.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.error;
      state.accessToken = null;
      state.refreshToken = null;
      state.success = false;
      state.isAuthenticated = false;
    });
    builder.addCase(forgotPasswordApiThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.success = true;
      state.isAuthenticated = false;
    });

    // Сброс пароля
    builder.addCase(resetPasswordApiThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.success = false;
      state.isAuthenticated = false;
    });
    builder.addCase(resetPasswordApiThunk.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.error;
      state.accessToken = null;
      state.refreshToken = null;
      state.success = false;
      state.isAuthenticated = false;
    });
    builder.addCase(resetPasswordApiThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.success = true;
      state.isAuthenticated = false;
    });
  }
});

export const { authChecked } = authSlice.actions;

export default authSlice.reducer;
