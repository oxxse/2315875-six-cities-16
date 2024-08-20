import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { CITIES } from '../../const';
import { Offer } from '../../types/types';
import { NameSpace } from '../../const';

type ActiveMainState = {
  activeOffer: Offer | null;
  currentCity: string;
  selectedSortingOption: string;
}


const initialState: ActiveMainState = {
  activeOffer: null,
  currentCity: CITIES[0],
  selectedSortingOption: 'Popular'
};


export const activeMainSlice = createSlice({
  name: NameSpace.ActiveMain,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    },
    setActiveOffer: (state, action: PayloadAction<Offer | null>) => {
      state.activeOffer = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.selectedSortingOption = action.payload;
    }
  }
});

export const { setCity, setActiveOffer, setSort } = activeMainSlice.actions;

export const activeMainReducer = activeMainSlice.reducer;
