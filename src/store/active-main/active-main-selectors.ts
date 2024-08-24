import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { PLACES_OPTIONS } from '../../const';

const selectCity = (state: Pick<State, NameSpace.ActiveMain>): string => state[NameSpace.ActiveMain].currentCity;
const selectSortingOption = (state: Pick<State, NameSpace.ActiveMain>): typeof PLACES_OPTIONS[number] => state[NameSpace.ActiveMain].selectedSortingOption;

export { selectCity, selectSortingOption };
