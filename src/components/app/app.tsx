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
import type { Offer } from '../../types/types';
import { getAuthorizationStatus } from '../../utils/common';
import { useState } from 'react';

type App = {
  offers: Offer[];
  reviews: Review[];
}

function App({ offers, reviews }: App): JSX.Element {
  const currentStatus = getAuthorizationStatus();
  const [ activeOffer, setActiveOffer ] = useState<Offer | null>(null);

  const handleHover = (offer?: Offer) => {
    setActiveOffer(offer || null);
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage offers={offers} activeOffer={activeOffer} onHover={handleHover}/>}/>
          <Route path={AppRoute.Main} element={<MainPage offers={offers} activeOffer={activeOffer} onHover={handleHover}/>} />
          <Route path={AppRoute.Favorites} element={<PrivateRoute status={currentStatus}><FavoritesPage offers={offers} /> </PrivateRoute>} />
          <Route path={AppRoute.Login} element={<PublicRoute status={currentStatus}> <LoginPage /> </PublicRoute>} />
          <Route path={AppRoute.Offer} element={<OfferPage offers={offers} reviews={reviews} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
