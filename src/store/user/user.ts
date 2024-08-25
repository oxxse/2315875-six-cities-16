import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../types/auth';
import { AuthorizationStatus, NameSpace } from '../../const';
import { checkAuthStatus, loginAction, logoutAction } from '../thunk-actions';

type UserState = {
  user: UserData | null | undefined;
  authorizationStatus: AuthorizationStatus;
  isAuthorizedError: boolean;
  isAuthorizedSubmitting: boolean;
  isLogoutLoading: boolean;
  isLogoutLoadingError: boolean;
}

const initialState: UserState = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isAuthorizedError: false,
  isAuthorizedSubmitting: false,
  isLogoutLoading: false,
  isLogoutLoadingError: false,
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
      })
      .addCase(logoutAction.pending, (state) => {
        state.isLogoutLoading = true;
        state.isLogoutLoadingError = false;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
        state.isLogoutLoading = false;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.isLogoutLoading = false;
        state.isLogoutLoadingError = true;
      });
  }
});
