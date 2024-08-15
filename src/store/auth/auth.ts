import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';

type authorizationState = {
  authorizationStatus: AuthorizationStatus;
}

const initialState: authorizationState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    requireAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    }
  }
});

export const { requireAuthorization } = authorizationSlice.actions;
export const authorizationReducer = authorizationSlice.reducer;
