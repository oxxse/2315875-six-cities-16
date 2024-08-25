import { createSlice } from '@reduxjs/toolkit';
import { Offer, PlaceCard, Review } from '../../types/types';
import { NameSpace } from '../../const.ts';
import { toast } from 'react-toastify';
import { fetchOfferComments, postComment, toggleFavoriteStatus, fetchNearbyOffers, getOfferData } from '../thunk-actions.ts';

type OfferState = {
  offerDetails: Offer | null;
  offerComments: Review[];
  nearbyOffers: PlaceCard[];
  isOfferDetailsLoading: boolean;
  isOfferDetailsError: boolean;
};

const initialState: OfferState = {
  offerDetails: null,
  offerComments: [],
  nearbyOffers: [],
  isOfferDetailsLoading: false,
  isOfferDetailsError: false,
};

export const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOfferData.pending, (state) => {
        state.isOfferDetailsLoading = true;
        state.isOfferDetailsError = false;
      })
      .addCase(getOfferData.fulfilled, (state, action) => {
        state.isOfferDetailsLoading = false;
        state.offerDetails = action.payload;
      })
      .addCase(getOfferData.rejected, (state) => {
        state.isOfferDetailsLoading = false;
        state.isOfferDetailsError = true;
        toast.error('Не удалось загрузить данные о предложении');
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchOfferComments.fulfilled, (state, action) => {
        state.offerComments = action.payload;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        if (action.payload) {
          if (state.offerComments) {
            state.offerComments = [...state.offerComments, action.payload];
          } else {
            state.offerComments = [action.payload];
          }
        }
      })
      .addCase(toggleFavoriteStatus.fulfilled, (state, action) => {
        if (state.offerDetails?.id === action.payload.id) {
          state.offerDetails = {...state.offerDetails, isFavorite: action.payload.isFavorite};
        }
        if (state.nearbyOffers) {
          const index = state.nearbyOffers.findIndex((offer) => offer.id === action.payload.id);
          if (index > -1) {
            state.nearbyOffers = [...state.nearbyOffers.slice(0, index), action.payload, ...state.nearbyOffers.slice(index + 1)];
          }
        }
      });
  }
});
