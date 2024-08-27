import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import { saveToken, dropToken } from '../services/token.ts';
import { ApiRoute, NameSpace } from '../const.ts';
import { CommentData, Offer, PlaceCard, Review } from '../types/types.ts';
import { store } from './index.ts';
import { AuthData, UserData } from '../types/auth.ts';
import { toast } from 'react-toastify';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: State;
  dispatch: typeof store.dispatch;
  extra: AxiosInstance;
}>();

export const fetchOffers = createAppAsyncThunk<PlaceCard[] | undefined, undefined>(`${NameSpace.Offers}/fetchOffers`,
  async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get<PlaceCard[]>(ApiRoute.Offers);
      return data;
    } catch {
      toast.warn('Не удалось загрузить данные с сервера');
    }
  }
);

export const checkAuthStatus = createAppAsyncThunk<UserData, undefined>(`${NameSpace.User}/checkAuthStatus`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(ApiRoute.Login);
    return data;
  }
);

export const loginAction = createAppAsyncThunk<UserData | null | undefined, AuthData>(`${NameSpace.User}/loginAction`,
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<UserData>(ApiRoute.Login, { email, password });
    saveToken(data.token);
    return data;
  }
);

export const logoutAction = createAppAsyncThunk<void, undefined>(`${NameSpace.User}/logoutAction`,
  async (_arg, { extra: api }) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  }
);

export const fetchNearbyOffers = createAppAsyncThunk<PlaceCard[], string>(`${NameSpace.Offers}/fetchNearbyOffers`,
  async (id, { extra: api }) => {
    const { data } = await api.get<PlaceCard[]>(`${ApiRoute.Offers}/${id}/nearby`);
    return data;
  }
);

export const fetchOfferComments = createAppAsyncThunk<Review[], string>(`${NameSpace.Offers}/fetchOfferComments`,
  async (id, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${ApiRoute.Comments}/${id}`);
    return data;
  }
);

export const postComment = createAppAsyncThunk<Review, CommentData>('offer/postCommentToOffer',
  async ({ id, comment }, { extra: api }) => {
    const { data } = await api.post<Review>(`${ApiRoute.Comments}/${id}`, { comment: comment.comment, rating: +comment.rating });
    return data;
  }
);

export const fetchFavoriteOffers = createAppAsyncThunk<Offer[], undefined>(`${NameSpace.Offers}/fetchFavoriteOffers`, async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>(ApiRoute.Favorites);
  return data;
});

export const toggleFavoriteStatus = createAppAsyncThunk<Offer, { offerId: string; status: number }>(`${NameSpace.Offers}/toggleFavoriteStatus`, async ({ offerId, status }, { extra: api }) => {
  const { data } = await api.post<Offer>(`${ApiRoute.Favorites}/${offerId}/${status}`);
  return data;
});

export const getOfferData = createAsyncThunk<Offer | null | undefined, string, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(`${NameSpace.Offers}/getOfferData`, async (id, { extra: api }) => {
  try {
    const { data } = await api.get<Offer>(`${ApiRoute.Offers}/${id}`);
    return data;
  } catch {
    toast.warn('Не удалось загрузить данные о предложении');
  }
});
