import { State } from '../../types/state.ts';
import { NameSpace } from '../../const.ts';

export const selectUser = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].user;
export const selectAuthorizationStatus = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].authorizationStatus;
export const selectLoginError = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].isAuthError;
export const selectSubmittingStatus = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].isAuthSubmitting;
