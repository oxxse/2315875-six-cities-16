import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainPage from '../../pages/main/main';
import FavoritesPage from '../../pages/favorites/favorites';
import OfferPage from '../../pages/offer/offer';
import LoginPage from '../../pages/login/login';
import NotFound from '../../pages/not-found-page/not-found';
import AccessRoute from '../access-route/access-route';
import { HelmetProvider } from 'react-helmet-async';
import { checkAuthAction, fetchFavoriteOffers } from '../../store/thunk-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { selectAuthorizationStatus } from '../../store/auth/auth-selector';
import { AuthorizationStatus } from '../../const';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffers());
    }
  }, [dispatch, authorizationStatus]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<MainPage/>}/>
          <Route path={AppRoute.Main} element={<MainPage/>} />
          <Route path={AppRoute.Favorites} element={<AccessRoute><FavoritesPage/></AccessRoute>} />
          <Route path={AppRoute.Login} element={<AccessRoute isReverse><LoginPage /></AccessRoute>} />
          <Route path={AppRoute.Offer} element={<OfferPage/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
