import { RootState } from '../types/state';

const selectCity = (state: RootState) => state.currentCity.currentCity;
const selectOffers = (state: RootState) => state.offers.offers;
const selectActiveOffer = (state: RootState) => state.activeOffer.activeOffer;
const selectSortingOption = (state: RootState) => state.sortingOption.selectedSortingOption;

export { selectCity, selectOffers, selectActiveOffer, selectSortingOption };
