import { RootState } from '../../types/state';
import { NameSpace } from '../../const';

const selectOffers = (state: RootState) => state[NameSpace.Offers].offers;
const selectOfferDetails = (state: RootState) => state[NameSpace.Offers].offerDetails;
const selectOfferComments = (state: RootState) => state[NameSpace.Offers].offerComments;
const selectNearbyOffers = (state: RootState) => state[NameSpace.Offers].nearbyOffers;
const selectFavoriteOffers = (state: RootState) => state[NameSpace.Offers].favoriteOffers;
const selectOffersDataLoading = (state: RootState) => state[NameSpace.Offers].isOffersDataLoading;

export {selectOffersDataLoading, selectFavoriteOffers, selectOffers, selectOfferDetails, selectOfferComments, selectNearbyOffers };
