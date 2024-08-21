import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import Main from '../../pages/main/main';
import FavoritesPage from '../../pages/favorites/favorites';
import OfferPage from '../../pages/offer/offer';
import LoginPage from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';
import AccessRoute from '../access-route/access-route';
import { HelmetProvider } from 'react-helmet-async';
import { fetchFavoriteOffers } from '../../store/offers/offers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { selectAuthorizationStatus } from '../../store/user/user-selectors';
import { AuthorizationStatus } from '../../const';
import { selectOffersDataLoading } from '../../store/offers/offer-selector';
import { selectError } from '../../store/error/error-selector';
import Spinner from '../spinner/spinner';
import { LoadingError } from '../loading-error/loading-error';


function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const error = useAppSelector(selectError);
  const isOffersDataLoading = useAppSelector(selectOffersDataLoading);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffers());
    }
  }, [dispatch, authorizationStatus]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <HelmetProvider>
        <Spinner />
      </HelmetProvider>
    );
  }

  if (error) {
    return (
      <HelmetProvider>
        <LoadingError />
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Main />} />
          <Route path={AppRoute.Main} element={<Main />} />
          <Route path={AppRoute.Favorites} element={<AccessRoute><FavoritesPage /></AccessRoute>} />
          <Route path={AppRoute.Login} element={<AccessRoute isReverse><LoginPage /></AccessRoute>} />
          <Route path={AppRoute.Offer} element={<OfferPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
