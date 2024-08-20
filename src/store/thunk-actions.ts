import { AxiosInstance } from 'axios';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../types/state.ts';
import { saveToken, dropToken, saveUserEmail, dropUserEmail } from '../services/token.ts';
import { ApiRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const.ts';
import { Offer, Review } from '../types/types.ts';
import { AuthData } from '../types/auth.ts';
import { UserData } from '../types/auth.ts';
import { store } from './index.ts';
import { setNearbyOffers, setOfferComments, setOfferDetails, loadOffers, updateOffer, setOffersDataLoadingStatus, setShouldFetchComments, setShouldFetchFavorites } from './offers/offers.ts';
import { setUser } from './user/user.ts';
import { requireAuthorization } from './user/user.ts';
import { setError, clearError } from './error/error.ts';

export const setFavoriteOffers = createAction<Offer[]>('offers/setFavoriteOffers');

export const clearErrorAction = createAsyncThunk(
  'error/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  }
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  RootState: RootState;
  extra: AxiosInstance;
}>(
  'offers/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    try {
      const { data } = await api.get<Offer[]>(ApiRoute.Offers);
      dispatch(loadOffers(data));
    } catch (error) {
      dispatch(setError('Something went wrong. Please check your connection and try again.'));
      setTimeout(() => {
        dispatch(clearError());
      }, TIMEOUT_SHOW_ERROR);
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  RootState: RootState;
  extra: AxiosInstance;
}>(
  'user/checkAuth', async (_arg, { dispatch, extra: api }) => {
    try {
      const response = await api.get<UserData>(ApiRoute.Login);
      dispatch(setUser(response.data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  RootState: RootState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const response = await api.post<UserData>(ApiRoute.Login, { email, password });
    saveToken(response.data.token);
    saveUserEmail(response.data.email);
    dispatch(setUser(response.data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  RootState: RootState;
  extra: AxiosInstance;
}>(
  'user/logout', async (_arg, { dispatch, extra: api }) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dropUserEmail();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);

export const fetchOfferDetailsById = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  RootState: RootState;
  extra: AxiosInstance;
}>(
  'offers/fetchOfferDetails',
  async (id, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    try {
      const { data } = await api.get<Offer>(`${ApiRoute.Offers}/${id}`);
      dispatch(setOfferDetails(data));
    } catch (error) {
      dispatch(setError('Unable to fetch offer details. Please try again later.'));
      setTimeout(() => {
        dispatch(clearError());
      }, TIMEOUT_SHOW_ERROR);
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }
  }
);

export const fetchOfferComments = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offers/fetchOfferComments',
  async (offerId, { dispatch, getState, extra: api }) => {
    if (!getState().offers.shouldFetchComments) {
      return;
    }
    try {
      const { data } = await api.get<Review[]>(`${ApiRoute.Comments}/${offerId}`);
      dispatch(setOfferComments(data));
    } catch (error) {
      dispatch(setError('Unable to fetch offer comments. Please try again later.'));
      setTimeout(() => {
        dispatch(clearError());
      }, TIMEOUT_SHOW_ERROR);
    }
  }
);

export const postComment = createAsyncThunk<Review, { offerId: string; commentText: string; rating: number }, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offers/postComment',
  async ({ offerId, commentText, rating }, { dispatch, getState, extra: api }) => {
    dispatch(setShouldFetchComments(false));
    try {
      const { data } = await api.post<Review>(`${ApiRoute.Comments}/${offerId}`, {
        comment: commentText,
        rating,
      });
      const currentComments: Review[] = getState().offers.offerComments;
      const updatedComments = [data, ...currentComments];
      dispatch(setOfferComments(updatedComments));
      return data;
    } catch (error) {
      dispatch(setError('Unable to post comment. Please try again later.'));
      setTimeout(() => {
        dispatch(clearError());
      }, TIMEOUT_SHOW_ERROR);
      return Promise.reject(error);
    }
  }
);


export const fetchNearbyOffers = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offers/fetchNearbyOffers',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offer[]>(`${ApiRoute.Offers}/${offerId}/nearby`);
      dispatch(setNearbyOffers(data));
    } catch (error) {
      dispatch(setError('Unable to fetch nearby offers. Please try again later.'));
      setTimeout(() => {
        dispatch(clearError());
      }, TIMEOUT_SHOW_ERROR);
    }
  }
);

export const fetchFavoriteOffers = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offers/fetchFavorites',
  async (_, { dispatch, getState, extra: api }) => {
    if (getState().offers.shouldFetchFavorites) {
      try {
        const response = await api.get<Offer[]>(ApiRoute.Favorites);
        return response.data;
      } catch (error) {
        dispatch(setError('Failed to get the list of favorite offers. Please, try again.'));
      } finally {
        setTimeout(() => {
          dispatch(clearError());
        }, TIMEOUT_SHOW_ERROR);
      }
    }
    return [];
  }
);

export const toggleFavoriteStatus = createAsyncThunk<void, { offerId: string; status: boolean }, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offers/toggleFavorite',
  async ({ offerId, status }, { dispatch, getState, extra: api }) => {
    dispatch(setShouldFetchFavorites(false));
    try {
      const response = await api.post<Offer>(`${ApiRoute.Favorites}/${offerId}/${status ? 1 : 0}`);
      dispatch(updateOffer(response.data));
      if (!status) {
        const updatedFavorites = getState().offers.favoriteOffers.filter((offer) => offer.id !== offerId);
        dispatch(setFavoriteOffers(updatedFavorites));
      } else {
        const newFavoriteOffer = response.data;
        const updatedFavorites = [...getState().offers.favoriteOffers, newFavoriteOffer];
        dispatch(setFavoriteOffers(updatedFavorites));
      }
    } catch (error) {
      dispatch(setError('Failed to change the status of the favorite offer. Please, try again.'));
      setTimeout(() => {
        dispatch(clearError());
      }, TIMEOUT_SHOW_ERROR);
    } finally {
      dispatch(setShouldFetchFavorites(true));
      dispatch(fetchFavoriteOffers());
    }
  }
);
