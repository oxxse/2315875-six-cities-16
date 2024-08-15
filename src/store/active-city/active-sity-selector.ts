import { RootState } from '../../types/state';

const selectCity = (state: RootState) => state.currentCity.currentCity;

export { selectCity };
