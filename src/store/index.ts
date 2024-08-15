import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from './offers/offers';
import { activeOfferReducer } from './active-offer/active-offer';
import { currentCityReducer } from './active-city/active-city';
import { sortingOptionReducer } from './sorting-option/sorting-option';
import { userReducer } from './user/user';
import { createAPI } from '../services/api';
import { authorizationReducer } from './auth/auth';
import { errorReducer } from './error/error';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    error: errorReducer,
    offers: offersReducer,
    currentCity: currentCityReducer,
    sortingOption: sortingOptionReducer,
    activeOffer: activeOfferReducer,
    user: userReducer,
    authorization: authorizationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
