import { RootState } from '../../types/state';
import { NameSpace } from '../../const';

const selectCity = (state: RootState) => state[NameSpace.ActiveMain].currentCity;
const selectActiveOffer = (state: RootState) => state[NameSpace.ActiveMain].activeOffer;
const selectSortingOption = (state: RootState) => state[NameSpace.ActiveMain].selectedSortingOption;

export { selectCity, selectActiveOffer, selectSortingOption };
