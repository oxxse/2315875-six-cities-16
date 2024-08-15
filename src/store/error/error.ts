import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type errorState = {
  error: string | null;

};

const initialState: errorState = {
  error: null,
};

export const errorSlice = createSlice({
  name: 'offers',
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

