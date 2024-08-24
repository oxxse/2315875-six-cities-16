import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../types/auth';
import { AuthorizationStatus, NameSpace } from '../../const';
import { checkAuthStatus, loginAction, logoutAction } from '../thunk-actions';
import { toast } from 'react-toastify';

type UserState = {
  user: UserData | null;
  authorizationStatus: AuthorizationStatus;
  isAuthError: boolean;
  isLogoutError: boolean;
  isAuthSubmitting: boolean;
}

const initialState: UserState = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isAuthError: false,
  isLogoutError: false,
  isAuthSubmitting: false
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.isAuthError = false;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isAuthError = true;
      })
      .addCase(loginAction.pending, (state) => {
        state.isAuthError = false;
        state.isAuthSubmitting = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
        state.isAuthSubmitting = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isAuthError = true;
        state.isAuthSubmitting = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        toast.error('Ошибка авторизации');
      })
      .addCase(logoutAction.pending, (state) => {
        state.isLogoutError = false;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.isLogoutError = true;
        toast.error('Ошибка выхода');
      });
  }
});
