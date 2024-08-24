import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { PlaceCard } from '../../types/types';

const selectOffers = (state: Pick<State, NameSpace.Offers>) : PlaceCard[] => state[NameSpace.Offers].offers;
const selectOffersDataLoading = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].isOffersDataLoading;
const selectOffersDataError = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].isError;
const selectToggleLoadingStatus = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].isToggleStatusLoading;
const selectFavoriteOffers = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].favoriteOffers;

export { selectToggleLoadingStatus, selectOffersDataError, selectOffersDataLoading, selectFavoriteOffers, selectOffers };
