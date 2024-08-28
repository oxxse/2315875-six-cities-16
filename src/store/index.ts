import { configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './offers/offers';
import { activeMainSlice } from './active-main/active-main';
import { userSlice } from './user/user';
import { createAPI } from '../services/api';
import { NameSpace } from '../const';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [NameSpace.Offers]: offersSlice.reducer,
    [NameSpace.ActiveMain]: activeMainSlice.reducer,
    [NameSpace.User]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});
