import { RootState } from '../../types/state.ts';
import { NameSpace } from '../../const.ts';

export const selectUser = (state: RootState) => state[NameSpace.User].user;
export const selectAuthorizationStatus = (state: RootState) => state[NameSpace.User].authorizationStatus;
