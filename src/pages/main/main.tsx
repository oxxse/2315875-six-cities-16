import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import PlaceSorting from '../../components/sorting-form/sorting-form.tsx/sorting';
import Map from '../../components/map/map';
import type { Offer } from '../../types/types';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import MainEmpty from '../../components/main-empty/main-empty';

type MainPage = {
  offers: Offer[];
  selectedCity: string;
  onCityClick: (city: string) => void;
}

function MainPage({ offers, selectedCity, onCityClick }: MainPage): JSX.Element {
  const placesTitle = offers.length === 1 ? 'place' : 'places';
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const filteredOffers = offers.filter((offer) => offer.city.name === selectedCity);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title> 6 cities.</title>
      </Helmet>
      <Header favorites={favoriteOffers} />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList selectedCity={selectedCity} onCityClick={onCityClick} />
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container container${filteredOffers.length ? '' : 'cities__places-container--empty'}`}>
            {filteredOffers.length ?
              <>
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{filteredOffers.length} {placesTitle} to stay in {selectedCity}</b>
                  <PlaceSorting width={7} height={4} />
                  <PlaceCardList offers={filteredOffers} classNameList={'cities__places-list'} classNameItem={'cities__'} imageWidth={260} imageHeight={200} />
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
