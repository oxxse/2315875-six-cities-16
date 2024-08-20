import { RootState } from '../../types/state';

const selectCity = (state: RootState) => state.activeMain.currentCity;
const selectActiveOffer = (state: RootState) => state.activeMain.activeOffer;
const selectSortingOption = (state: RootState) => state.activeMain.selectedSortingOption;

export { selectCity, selectActiveOffer, selectSortingOption };
