import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import PlaceSorting from '../../components/sorting-form/sorting-form.tsx/sorting';
import Map from '../../components/map/map';
import type { Offer } from '../../types/types';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import MainEmpty from '../../components/main-empty/main-empty';

type MainPageProps = {
  offers: Offer[];
}

function MainPage({ offers }: MainPageProps): JSX.Element {
  const placesTitle = offers.length === 1 ? 'place' : 'places';
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title> 6 cities.</title>
      </Helmet>
      <Header favorites={favoriteOffers}/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList />
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container container${offers.length ? '' : 'cities__places-container--empty'}`}>
            {offers.length ?
              <>
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offers.length} {placesTitle} to stay in Amsterdam</b>
                  <PlaceSorting width={7} height={4} />
                  <PlaceCardList offers={offers} className={'cities'} imageWidth={260} imageHeight={200} />
                </section>
                <div className="cities__right-section">
                  <Map className='cities' />
                </div>
              </> :
              <>
                <MainEmpty />
                <div className="cities__right-section"></div>
              </>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
