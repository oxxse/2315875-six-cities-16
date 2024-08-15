import { RootState } from '../../types/state.ts';

export const selectAuthorizationStatus = (state: RootState) => state.authorization.authorizationStatus;
