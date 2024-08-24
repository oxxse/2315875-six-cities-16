import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';
import FavoritePlacesList from '../../components/favorite-places-list/favorite-places-list';
import NoFavorites from '../../components/no-favorites/no-favorites';
import { useAppSelector } from '../../hooks';
import { selectFavoriteOffers } from '../../store/offers/offers-selectors';


function FavoritesPage(): JSX.Element {
  const favorites = useAppSelector(selectFavoriteOffers);

  return (
    <>
      <main className={`page__main page__main--favorites${!favorites.length && 'page__main--favorites-empty'}`}>
        <Helmet>
          <title>6 cities: Favorites</title>
        </Helmet>
        <div className="page__favorites-container container">
          {favorites.length ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritePlacesList offers={favorites} />
            </section> : <NoFavorites />}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default FavoritesPage;
