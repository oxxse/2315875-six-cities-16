import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

type errorState = {
  error: string | null;

};

const initialState: errorState = {
  error: null,
};

export const errorSlice = createSlice({
  name: NameSpace.Error,
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
});

export const {setError, clearError} = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
