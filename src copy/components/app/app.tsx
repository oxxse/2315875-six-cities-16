import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainPage from '../../pages/main/main';
import FavoritesPage from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import LoginPage from '../../pages/login/login';
import NotFound from '../../pages/not-found-page/not-found';
import type { AuthStatus } from '../access-route/access-foute';
import { PublicRoute, PrivateRoute } from '../access-route/access-foute';
import { AppPropsType } from '../../mock/app';

const currentStatus: AuthStatus = 'NO_AUTH';

function App({ offers, reviews }: AppPropsType): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage offersCount={offers} />}>
          <Route path={AppRoute.Favorites} element={<PrivateRoute status={currentStatus}><FavoritesPage /> </PrivateRoute>} />
          <Route path={AppRoute.Login} element={<PublicRoute status={currentStatus}> <LoginPage /> </PublicRoute>} />
          <Route path={AppRoute.Offer} element={<Offer hotels={offers} comments={reviews} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
