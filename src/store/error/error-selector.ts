import { RootState } from '../../types/state';
import { NameSpace } from '../../const';

const selectError = (state: RootState) => state[NameSpace.Error].error;

export {selectError};
