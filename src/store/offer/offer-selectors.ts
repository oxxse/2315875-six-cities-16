import { State } from '../../types/state';
import { NameSpace } from '../../const';

const selectOfferDetails = (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].offerDetails;
const selectOfferComments = (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].offerComments;
const selectNearbyOffers = (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].nearbyOffers;
const selectOfferLoadingStatus = (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].isOfferDetailsLoading;
const selectOfferLoadingError = (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].isOfferDetailsError;
const selectOfferCommentLoading = (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].isPostCommentLoading;
const selectOfferCommentError = (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].isPostReviewError;

export {selectOfferLoadingStatus, selectOfferCommentLoading, selectOfferCommentError, selectOfferLoadingError, selectOfferDetails, selectOfferComments, selectNearbyOffers };
