import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import PlaceSorting from '../../components/sorting-form/sorting-form.tsx/sorting';
import Map from '../../components/map/map';
import type { Offer } from '../../types/types';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import NoOffers from '../../components/no-offers/no-offers';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_ACTIVE_CITY } from '../../const';
import { useEffect } from 'react';

type MainPage = {
  offers: Offer[];
  activeOffer?: Offer | null;
  onHover: (offer?: Offer) => void;
}

function MainPage({ offers, activeOffer, onHover }: MainPage): JSX.Element {
  const navigate = useNavigate();
  const { selectedCity } = useParams();

  useEffect(() => {
    if (!selectedCity) {
      navigate(BASE_ACTIVE_CITY);
    }
  }, [navigate, selectedCity]);


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
            <LocationsList />
          </section>
        </div>
        <div className="cities">
          {filteredOffers.length &&
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} {placesTitle} to stay in {selectedCity}</b>
                <PlaceSorting width={7} height={4} />
                <PlaceCardList offers={filteredOffers} onHover={onHover} classNameList={'cities__places-list'} classNameItem={'cities__'} imageWidth={260} imageHeight={200} />
              </section>
              <div className="cities__right-section">
                <Map offers={filteredOffers} city={filteredOffers[0].city.location} className='cities' activeOffer={activeOffer} />
              </div>
            </div>}
          {!filteredOffers.length && selectedCity && <NoOffers city={selectedCity} />}
        </div>
      </main>
    </div >
  );
}

export default MainPage;
