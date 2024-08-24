import { store } from '../store/index.ts';
import { setError } from '../store/error/error.ts';
import { clearErrorAction } from '../store/thunk-actions.ts';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
