import { getUserApi, logoutApi, updateUserApi } from '@api';
import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export const getUserApiThunk = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

interface IUpdateUserApiParams {
  email: string;
  name: string;
  password: string;
}

export const updateUserApiThunk = createAsyncThunk(
  'user/updateUser',
  async (params: IUpdateUserApiParams) => await updateUserApi({ ...params })
);

export const logoutApiThunk = createAsyncThunk(
  'user/logout',
  async () => await logoutApi()
);

type TUserState = {
  isLoading: boolean;
  isLogout: boolean;
  error: SerializedError | null;
  user: TUser;
};

const initialState: TUserState = {
  isLoading: false,
  isLogout: false,
  error: null,
  user: {
    email: '',
    name: ''
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (
      state,
      action: PayloadAction<{ name: string; email: string }>
    ) => {
      if (state.user) {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
      }
    }
  },
  selectors: {
    selectUser: (state) => state.user
  },
  extraReducers: (builder) => {
    // Получение пользователя
    builder.addCase(getUserApiThunk.pending, (state) => {
      state.isLoading = true;
      state.isLogout = false;
      state.error = null;
      state.user = {
        email: '',
        name: ''
      };
    });
    builder.addCase(getUserApiThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isLogout = false;
      state.error = action.error;
      state.user = {
        email: '',
        name: ''
      };
    });
    builder.addCase(getUserApiThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogout = false;
      state.error = null;
      state.user = action.payload.user;
    });

    // Обновление пользователя
    builder.addCase(updateUserApiThunk.pending, (state) => {
      state.isLoading = true;
      state.isLogout = false;
      state.error = null;
    });
    builder.addCase(updateUserApiThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isLogout = false;
      state.error = action.error;
    });
    builder.addCase(updateUserApiThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogout = false;
      state.error = null;
      state.user!.name = action.payload.user.name;
      state.user!.email = action.payload.user.email;
    });

    //Выход пользователя
    builder.addCase(logoutApiThunk.pending, (state) => {
      state.isLoading = true;
      state.isLogout = false;
      state.error = null;
    });
    builder.addCase(logoutApiThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isLogout = false;
      state.error = action.error;
    });
    builder.addCase(logoutApiThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogout = true;
      state.error = null;
      state.user = {
        email: '',
        name: ''
      };
    });
  }
});

export const { updateUser } = userSlice.actions;
export const { selectUser } = userSlice.selectors;

export default userSlice.reducer;
