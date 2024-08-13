import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainPage from '../../pages/main/main';
import FavoritesPage from '../../pages/favorites/favorites';
import OfferPage from '../../pages/offer/offer';
import LoginPage from '../../pages/login/login';
import NotFound from '../../pages/not-found-page/not-found';
import { PublicRoute, PrivateRoute } from '../access-route/access-foute';
import { HelmetProvider } from 'react-helmet-async';
import type { Review } from '../../types/types';
import { getAuthorizationStatus } from '../../utils/common';

type App = {
  reviews: Review[];
}

function App({ reviews }: App): JSX.Element {
  const currentStatus = getAuthorizationStatus();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path={AppRoute.Main} element={<MainPage />} />
          <Route path={AppRoute.Favorites} element={<PrivateRoute status={currentStatus}><FavoritesPage /> </PrivateRoute>} />
          <Route path={AppRoute.Login} element={<PublicRoute status={currentStatus}> <LoginPage /> </PublicRoute>} />
          <Route path={AppRoute.Offer} element={<OfferPage reviews={reviews} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
