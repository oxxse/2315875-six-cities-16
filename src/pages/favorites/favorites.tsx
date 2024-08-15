import { useEffect } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';
import FavoritePlacesList from '../../components/favorite-places-list/favorite-places-list';
import NoFavorites from '../../components/no-favorites/no-favorites';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectFavoriteOffers } from '../../store/offers/offer-selector';
import { selectAuthorizationStatus } from '../../store/auth/auth-selector';
import { fetchFavoriteOffers } from '../../store/thunk-actions';
import { AuthorizationStatus } from '../../const';
function FavoritesPage(): JSX.Element {
  const favoriteOffers = useAppSelector(selectFavoriteOffers);
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffers());
    }
  }, [dispatch, authorizationStatus]);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: Favorites</title>
      </Helmet>
      <Header/>
      <main className={`page__main page__main--favorites${!favoriteOffers.length && 'page__main--favorites-empty'}`}>
        <div className="page__favorites-container container">
          {favoriteOffers.length ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritePlacesList offers={favoriteOffers} />
            </section> : <NoFavorites />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
