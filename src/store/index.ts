import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from './offers/offers';
import { activeMainReducer } from './active-main/active-main';
import { userReducer } from './user/user';
import { createAPI } from '../services/api';
import { errorReducer } from './error/error';
import { NameSpace } from '../const';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [NameSpace.Error]: errorReducer,
    [NameSpace.Offers]: offersReducer,
    [NameSpace.ActiveMain]: activeMainReducer,
    [NameSpace.User]: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
