import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store/index';
import { fetchOffers, fetchFavoriteOffers, checkAuthStatus } from './store/thunk-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchOffers());
store.dispatch(checkAuthStatus())
  .then((response) => {
    if (response.meta.requestStatus === 'fulfilled') {
      store.dispatch(fetchFavoriteOffers());
    }
  });

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
