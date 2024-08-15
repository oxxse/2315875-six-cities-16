import {store} from '../store/index.js';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type State = ReturnType<typeof store.getState>;
