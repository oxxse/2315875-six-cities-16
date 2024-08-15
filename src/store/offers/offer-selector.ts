import { RootState } from '../../types/state';

const selectOffers = (state: RootState) => state.offers.offers;
const selectOfferDetails = (state: RootState) => state.offers.offerDetails;
const selectOfferComments = (state: RootState) => state.offers.offerComments;
const selectNearbyOffers = (state: RootState) => state.offers.nearbyOffers;
const selectFavoriteOffers = (state: RootState) => state.offers.favoriteOffers;
const selectOffersDataLoading = (state: RootState) => state.offers.isOffersDataLoading;

export {selectOffersDataLoading, selectFavoriteOffers, selectOffers, selectOfferDetails, selectOfferComments, selectNearbyOffers };
