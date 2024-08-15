import { RootState } from '../../types/state.ts';

export const selectUser = (state: RootState) => state.user.user;

