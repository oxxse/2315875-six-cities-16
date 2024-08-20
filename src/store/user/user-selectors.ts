import { RootState } from '../../types/state.ts';

export const selectUser = (state: RootState) => state.user.user;
export const selectAuthorizationStatus = (state: RootState) => state.user.authorizationStatus;
