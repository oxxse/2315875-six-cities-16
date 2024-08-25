import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../types/auth';
import { AuthorizationStatus, NameSpace } from '../../const';
import { checkAuthStatus, loginAction, logoutAction } from '../thunk-actions';
import { toast } from 'react-toastify';

type UserState = {
  user: UserData | null;
  authorizationStatus: AuthorizationStatus;
  isAuthorizedError: boolean;
  isAuthorizedSubmitting: boolean;
}

const initialState: UserState = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isAuthorizedError: false,
  isAuthorizedSubmitting: false
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.isAuthorizedError = false;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isAuthorizedError = true;
      })
      .addCase(loginAction.pending, (state) => {
        state.isAuthorizedError = false;
        state.isAuthorizedSubmitting = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
        state.isAuthorizedSubmitting = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isAuthorizedError = true;
        state.isAuthorizedSubmitting = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        toast.error('Ошибка авторизации');
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      });
  }
});
