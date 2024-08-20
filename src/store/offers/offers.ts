import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Offer, Review } from '../../types/types';
import { NameSpace } from '../../const.ts';


type OffersState = {
  offers: Offer[];
  error: string | null;
  isOffersDataLoading: boolean;
  offerDetails: Offer | null;
  offerComments: Review[];
  nearbyOffers: Offer[];
  isOneOfferDataLoading: boolean;
  favoriteOffers: Offer[];
  shouldFetchComments: boolean;
  shouldFetchFavorites: boolean;
};

const initialState: OffersState = {
  offers: [],
  error: null,
  isOffersDataLoading: false,
  offerDetails: null,
  offerComments: [],
  nearbyOffers: [],
  isOneOfferDataLoading: false,
  favoriteOffers: [],
  shouldFetchComments: true,
  shouldFetchFavorites: true,
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    loadOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    setOffersDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffersDataLoading = action.payload;
    },
    setOfferDetails: (state, action: PayloadAction<Offer | null>) => {
      state.offerDetails = action.payload;
    },
    setOfferComments: (state, action: PayloadAction<Review[]>) => {
      state.offerComments = action.payload;
    },
    setNearbyOffers: (state, action: PayloadAction<Offer[]>) => {
      state.nearbyOffers = action.payload;
    },
    setShouldFetchComments: (state, action: PayloadAction<boolean>) => {
      state.shouldFetchComments = action.payload;
    },
    setShouldFetchFavorites: (state, action: PayloadAction<boolean>) => {
      state.shouldFetchFavorites = action.payload;
    },
    updateOffer: (state, action: PayloadAction<Offer>) => {
      if (state.offerDetails && state.offerDetails.id === action.payload.id) {
        state.offerDetails = { ...state.offerDetails, ...action.payload };
      }
      const offersIndex = state.offers.findIndex((offer) => offer.id === action.payload.id);
      if (offersIndex !== -1) {
        state.offers[offersIndex] = action.payload;
      }
      const nearbyOffersIndex = state.nearbyOffers.findIndex((offer) => offer.id === action.payload.id);
      if (nearbyOffersIndex !== -1) {
        state.nearbyOffers[nearbyOffersIndex] = action.payload;
      }
      const favoriteOffersIndex = state.favoriteOffers.findIndex((offer) => offer.id === action.payload.id);
      if (favoriteOffersIndex !== -1) {
        state.favoriteOffers[favoriteOffersIndex] = action.payload;
      }
    }
  }
});


export const displayOffers = offersSlice.actions;
export const { setOffers, loadOffers, setOffersDataLoadingStatus, setOfferDetails, setNearbyOffers, setOfferComments, setShouldFetchComments, setShouldFetchFavorites, updateOffer } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
