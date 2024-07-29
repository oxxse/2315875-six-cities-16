import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/types';
import FavoritePlacesList from '../../components/favorite-places-list/favorite-places-list';
import FavoriteEmpty from '../../components/favorite-empty/favorite-empty';

type FavoritesPage = {
  offers: Offer[];
}


const groupOffersByCity = (offers: Offer[]) => offers.reduce((accumulator: Record<string, Offer[]>, offer) => {
  const cityName = offer.city.name;
  if (!accumulator[cityName]) {
    accumulator[cityName] = [];
  }
  accumulator[cityName].push(offer);
  return accumulator;
}, {} as Record<string, Offer[]>);

function FavoritesPage({ offers }: FavoritesPage): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const groupedOffers = groupOffersByCity(favoriteOffers);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: Favorites</title>
      </Helmet>
      <Header favorites={favoriteOffers} />
      <main className={`page__main page__main--favorites${favoriteOffers.length ? '' : 'page__main--favorites-empty'}`}>
        <div className="page__favorites-container container">
          {favoriteOffers.length ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritePlacesList groupedOffers={groupedOffers} />
            </section> : <FavoriteEmpty />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
