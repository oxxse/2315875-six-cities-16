import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../types/auth';

type UserState = {
  user: UserData | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
