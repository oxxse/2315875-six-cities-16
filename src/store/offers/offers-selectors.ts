import { State } from '../../types/state';
import { NameSpace } from '../../const';

const selectOffers = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].offers;
const selectOffersDataLoading = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].isOffersDataLoading;
const selectFavoriteOffers = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].favoriteOffers;
const selectOfferDetails = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].offerDetails;
const selectOfferComments = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].offerComments;
const selectNearbyOffers = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].nearbyOffers;
const selectOfferLoadingStatus = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].isOfferDetailsLoading;
const selectOfferLoadingError = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].isOfferDetailsError;
const selectFavoriteTogglingStatus = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].isFavoriteStatusToggling;
const selectCommentPostingStatus = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].isCommentPosting;
const selectCommentPostingErrorStatus = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].isCommentPostingError;

export { selectCommentPostingErrorStatus, selectCommentPostingStatus, selectOfferLoadingStatus, selectOfferLoadingError, selectOfferDetails, selectOfferComments, selectNearbyOffers, selectFavoriteTogglingStatus, selectOffersDataLoading, selectFavoriteOffers, selectOffers };
