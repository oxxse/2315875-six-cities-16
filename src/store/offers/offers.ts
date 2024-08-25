import { createSlice } from '@reduxjs/toolkit';
import { Offer, Review, PlaceCard } from '../../types/types';
import { NameSpace } from '../../const.ts';
import { toggleFavoriteStatus, fetchFavoriteOffers, fetchOffers } from '../thunk-actions.ts';
import { fetchOfferComments, postComment, fetchNearbyOffers, getOfferData } from '../thunk-actions.ts';

type OffersState = {
  offers: PlaceCard[] | undefined;
  isOffersDataLoading: boolean;
  isError: boolean;
  favoriteOffers: Array<PlaceCard | Offer>;
  isFavoriteOffersLoading: boolean;
  isFavoriteStatusToggling: boolean;
  isFavoriteOffersLoadingError: boolean;
  isFavoriteStatusTogglingError: boolean;
  offerDetails: Offer | null | undefined;
  offerComments: Review[];
  nearbyOffers: PlaceCard[];
  isOfferDetailsLoading: boolean;
  isOfferDetailsError: boolean;
  isNearbyOffersLoading: boolean;
  isNearbyOffersError: boolean;
  isOfferCommentsLoading: boolean;
  isOfferCommentsError: boolean;
  isCommentPosting: boolean;
  isCommentPostingError: boolean;
};

const initialState: OffersState = {
  offers: [],
  isOffersDataLoading: false,
  favoriteOffers: [],
  isError: false,
  isFavoriteOffersLoading: false,
  isFavoriteStatusToggling: false,
  isFavoriteOffersLoadingError: false,
  isFavoriteStatusTogglingError: false,
  offerDetails: null,
  offerComments: [],
  nearbyOffers: [],
  isOfferDetailsLoading: false,
  isOfferDetailsError: false,
  isNearbyOffersLoading: false,
  isNearbyOffersError: false,
  isOfferCommentsLoading: false,
  isOfferCommentsError: false,
  isCommentPosting: false,
  isCommentPostingError: false,
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
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
      })
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.isNearbyOffersLoading = true;
        state.isNearbyOffersError = false;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isNearbyOffersLoading = false;
      })
      .addCase(fetchNearbyOffers.rejected, (state) => {
        state.isNearbyOffersLoading = false;
        state.isNearbyOffersError = true;
      })
      .addCase(fetchOfferComments.pending, (state) => {
        state.isOfferCommentsLoading = true;
        state.isOfferCommentsError = false;
      })
      .addCase(fetchOfferComments.fulfilled, (state, action) => {
        state.offerComments = action.payload;
        state.isOfferCommentsLoading = false;
      })
      .addCase(fetchOfferComments.rejected, (state) => {
        state.isOfferCommentsLoading = false;
        state.isOfferCommentsError = true;
      })
      .addCase(postComment.pending, (state) => {
        state.isCommentPosting = true;
        state.isCommentPostingError = false;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        if (action.payload) {
          if (state.offerComments) {
            state.offerComments = [...state.offerComments, action.payload];
          } else {
            state.offerComments = [action.payload];
          }
        }
        state.isCommentPosting = false;
      })
      .addCase(postComment.rejected, (state) => {
        state.isCommentPosting = false;
        state.isCommentPostingError = true;
      })
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
      })
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isFavoriteOffersLoading = true;
        state.isFavoriteOffersLoadingError = false;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersLoading = false;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.isFavoriteOffersLoading = false;
        state.isFavoriteOffersLoadingError = true;
      })
      .addCase(toggleFavoriteStatus.pending, (state) => {
        state.isFavoriteStatusToggling = true;
        state.isFavoriteStatusTogglingError = false;
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
        if (state.offerDetails?.id === action.payload.id) {
          state.offerDetails = { ...state.offerDetails, isFavorite: action.payload.isFavorite };
        }
        if (state.nearbyOffers) {
          const index = state.nearbyOffers.findIndex((offer) => offer.id === action.payload.id);
          if (index > -1) {
            state.nearbyOffers = [...state.nearbyOffers.slice(0, index), action.payload, ...state.nearbyOffers.slice(index + 1)];
          }
        }
        state.isFavoriteStatusToggling = false;
      })
      .addCase(toggleFavoriteStatus.rejected, (state) => {
        state.isFavoriteStatusToggling = false;
        state.isFavoriteStatusTogglingError = true;
      });
  }
});
