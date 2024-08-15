import { RootState } from '../../types/state';

const selectActiveOffer = (state: RootState) => state.activeOffer.activeOffer;

export { selectActiveOffer };
