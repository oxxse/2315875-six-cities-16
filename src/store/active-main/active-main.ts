import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { CITIES } from '../../const';
import { NameSpace, PLACES_OPTIONS } from '../../const';

type ActiveMainState = {
  currentCity: string;
  selectedSortingOption: typeof PLACES_OPTIONS[number];
}

const initialState: ActiveMainState = {
  currentCity: CITIES[0],
  selectedSortingOption: PLACES_OPTIONS[0]
};

export const activeMainSlice = createSlice({
  name: NameSpace.ActiveMain,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    },
    setSort: (state, action: PayloadAction<typeof PLACES_OPTIONS[number]>) => {
      state.selectedSortingOption = action.payload;
    }
  }
});

export const { setCity, setSort } = activeMainSlice.actions;

