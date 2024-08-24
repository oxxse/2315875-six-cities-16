import { createSlice } from '@reduxjs/toolkit';
import { Offer, PlaceCard } from '../../types/types';
import { NameSpace } from '../../const.ts';
import { toggleFavoriteStatus, fetchFavoriteOffers, fetchOffers } from '../thunk-actions.ts';
import { toast } from 'react-toastify';


type OffersState = {
  offers: PlaceCard[];
  isOffersDataLoading: boolean;
  isError: boolean;
  favoriteOffers: Array<PlaceCard | Offer>;
  isToggleStatusLoading: boolean;
};

const initialState: OffersState = {
  offers: [],
  isOffersDataLoading: false,
  favoriteOffers: [],
  isToggleStatusLoading: false,
  isError: false,
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isOffersDataLoading = true;
        state.isError = false;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.isError = true;
        toast.error('Не удалось загрузить данные с сервера');
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(toggleFavoriteStatus.fulfilled, (state, action) => {
        if (state.offers) {
          const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
          state.offers = [...state.offers.slice(0, index), action.payload, ...state.offers.slice(index + 1)];

        }
        if (state.favoriteOffers) {
          state.favoriteOffers = (action.payload.isFavorite) ? [...state.favoriteOffers, action.payload] : [...state.favoriteOffers.filter((offer) => offer.id !== action.payload.id)];
        } else {
          state.favoriteOffers = [action.payload];
        }
      });
  }
});
