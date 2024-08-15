import { RootState } from '../../types/state';

const selectSortingOption = (state: RootState) => state.sortingOption.selectedSortingOption;

export { selectSortingOption };
