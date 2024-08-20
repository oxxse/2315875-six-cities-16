import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../types/auth';
import { AuthorizationStatus } from '../../const';

type UserState = {
  user: UserData | null;
  authorizationStatus: AuthorizationStatus;
}

const initialState: UserState = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
    },
    requireAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    }
  }
});

export const { setUser, requireAuthorization } = userSlice.actions;

export const userReducer = userSlice.reducer;
