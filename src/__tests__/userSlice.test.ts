import {
  getUserApi,
  updateUserApi,
  logoutApi,
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi
} from '@api';
import { TUser } from '@utils-types';
import reducer, {
  forgotPasswordApiThunk,
  getUserApiThunk,
  init,
  loginUserThunk,
  logoutApiThunk,
  registerUserThunk,
  resetPasswordApiThunk,
  updateUserApiThunk
} from '../services/slices/userSlice';

jest.mock('@api', () => ({
  getUserApi: jest.fn(),
  updateUserApi: jest.fn(),
  logoutApi: jest.fn(),
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  forgotPasswordApi: jest.fn(),
  resetPasswordApi: jest.fn()
}));

describe('userSlice', () => {
  const initialState = {
    isInit: false,
    isLoading: false,
    isLogout: false,
    error: null,
    user: null,
    isAuthChecked: false,
    isAuthenticated: false
  };

  const mockUser: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle init action', () => {
    const action = { type: init.type };
    const expectedState = {
      ...initialState,
      isInit: true
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle getUserApiThunk.pending', () => {
    const action = { type: getUserApiThunk.pending.type };
    const expectedState = {
      ...initialState,
      isLoading: true
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle getUserApiThunk.fulfilled', () => {
    const action = {
      type: getUserApiThunk.fulfilled.type,
      payload: { user: mockUser }
    };
    const expectedState = {
      ...initialState,
      isInit: true,
      isLoading: false,
      user: mockUser
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle getUserApiThunk.rejected', () => {
    const error = { message: 'Error message' };
    const action = { type: getUserApiThunk.rejected.type, error };
    const expectedState = {
      ...initialState,
      isInit: true,
      isLoading: false,
      error
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle updateUserApiThunk.pending', () => {
    const action = { type: updateUserApiThunk.pending.type };
    const expectedState = {
      ...initialState,
      isLoading: true
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle updateUserApiThunk.fulfilled', () => {
    const action = {
      type: updateUserApiThunk.fulfilled.type,
      payload: { user: mockUser }
    };
    const expectedState = {
      ...initialState,
      isLoading: false,
      user: mockUser
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle updateUserApiThunk.rejected', () => {
    const error = { message: 'Error message' };
    const action = { type: updateUserApiThunk.rejected.type, error };
    const expectedState = {
      ...initialState,
      isLoading: false,
      error
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle logoutApiThunk.pending', () => {
    const action = { type: logoutApiThunk.pending.type };
    const expectedState = {
      ...initialState,
      isLoading: true
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle logoutApiThunk.fulfilled', () => {
    const action = { type: logoutApiThunk.fulfilled.type };
    const expectedState = {
      ...initialState,
      isInit: false,
      isLoading: false,
      isLogout: true,
      user: null
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle logoutApiThunk.rejected', () => {
    const error = { message: 'Error message' };
    const action = { type: logoutApiThunk.rejected.type, error };
    const expectedState = {
      ...initialState,
      isLoading: false,
      error
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle registerUserThunk.pending', () => {
    const action = { type: registerUserThunk.pending.type };
    const expectedState = {
      ...initialState,
      isLoading: true
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle registerUserThunk.fulfilled', () => {
    const action = { type: registerUserThunk.fulfilled.type };
    const expectedState = {
      ...initialState,
      isLoading: false
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle registerUserThunk.rejected', () => {
    const error = { message: 'Error message' };
    const action = { type: registerUserThunk.rejected.type, error };
    const expectedState = {
      ...initialState,
      isLoading: true,
      error
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle loginUserThunk.pending', () => {
    const action = { type: loginUserThunk.pending.type };
    const expectedState = {
      ...initialState,
      isLoading: true
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle loginUserThunk.fulfilled', () => {
    const action = {
      type: loginUserThunk.fulfilled.type,
      payload: { user: mockUser }
    };
    const expectedState = {
      ...initialState,
      isLoading: false,
      isAuthenticated: true,
      user: mockUser
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle loginUserThunk.rejected', () => {
    const error = { message: 'Error message' };
    const action = { type: loginUserThunk.rejected.type, error };
    const expectedState = {
      ...initialState,
      isLoading: true,
      error
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle forgotPasswordApiThunk.pending', () => {
    const action = { type: forgotPasswordApiThunk.pending.type };
    const expectedState = {
      ...initialState,
      isLoading: true
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle forgotPasswordApiThunk.fulfilled', () => {
    const action = { type: forgotPasswordApiThunk.fulfilled.type };
    const expectedState = {
      ...initialState,
      isLoading: false
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle forgotPasswordApiThunk.rejected', () => {
    const error = { message: 'Error message' };
    const action = { type: forgotPasswordApiThunk.rejected.type, error };
    const expectedState = {
      ...initialState,
      isLoading: true,
      error
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle resetPasswordApiThunk.pending', () => {
    const action = { type: resetPasswordApiThunk.pending.type };
    const expectedState = {
      ...initialState,
      isLoading: true
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle resetPasswordApiThunk.fulfilled', () => {
    const action = { type: resetPasswordApiThunk.fulfilled.type };
    const expectedState = {
      ...initialState,
      isLoading: false
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle resetPasswordApiThunk.rejected', () => {
    const error = { message: 'Error message' };
    const action = { type: resetPasswordApiThunk.rejected.type, error };
    const expectedState = {
      ...initialState,
      isLoading: true,
      error
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
