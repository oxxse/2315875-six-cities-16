import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/types';

type ActiveOfferState = {
  activeOffer: Offer | null;
}


const initialState: ActiveOfferState = {
  activeOffer: null
};

export const activeOfferSlice = createSlice({
  name: 'activeOffer',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<Offer | null>) => {
      state.activeOffer = action.payload;
    }
  }
});

export const {change: setActiveOffer} = activeOfferSlice.actions;

export const activeOfferReducer = activeOfferSlice.reducer;
