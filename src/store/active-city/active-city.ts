import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { CITIES } from '../../const';

type CurrentCityState = {
  currentCity: string;
}


const initialState: CurrentCityState = {
  currentCity: CITIES[0]
};

export const currentCitySlice = createSlice({
  name: 'activeCity',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    }
  }
});

export const { change: setCity } = currentCitySlice.actions;

export const currentCityReducer = currentCitySlice.reducer;
