import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from './display-offers';
import { activeOfferReducer } from './active-offer';
import { currentCityReducer } from './active-city';
import { sortingOptionReducer } from './sorting-option';

export const store = configureStore({
  reducer: {
    offers: offersReducer,
    currentCity: currentCityReducer,
    sortingOption: sortingOptionReducer,
    activeOffer: activeOfferReducer
  }
});
