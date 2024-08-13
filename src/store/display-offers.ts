import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { offerPageData } from '../mock/offers';
import { Offer } from '../types/types';

type OffersState = {
  offers: Offer[];
};

const initialState: OffersState = {
  offers: offerPageData
};

export const offersSlice = createSlice({
  name: 'displayOffers',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    }
  }
});

export const displayOffers = offersSlice.actions;

export const offersReducer = offersSlice.reducer;
