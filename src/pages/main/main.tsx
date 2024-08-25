import { Helmet } from 'react-helmet-async';
import LocationsList from '../../components/locations-list/locations-list';
import Map from '../../components/map/map';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import NoOffers from '../../components/no-offers/no-offers';
import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCity, selectSortingOption } from '../../store/active-main/active-main-selectors';
import { selectOffers } from '../../store/offers/offers-selectors';
import { PlaceCard, SortingOption } from '../../types/types';
import { CITY_LOCATIONS } from '../../const';
import { getSortedOffers } from '../../utils/common';
import { useState } from 'react';
import { setSort } from '../../store/active-main/active-main';
import SortingForm from '../../components/sorting-form/sorting-form';

function Main(): JSX.Element {
  const selectedCity = useAppSelector(selectCity);
  const offers = useAppSelector(selectOffers);
  const selectedSortingOption = useAppSelector(selectSortingOption);
  const dispatch = useAppDispatch();

  const handleOptionClick = useCallback((option: SortingOption) => {
    dispatch(setSort(option));
  }, [dispatch]);

  const [activeOffer, setActiveOffer] = useState<PlaceCard | null>();

  const handleOfferHover = useCallback((offer?: PlaceCard) => {
    setActiveOffer(offer);
  }, []);

  const filterOffers = useCallback((cards: PlaceCard[] | undefined) => cards?.filter((card) => card.city.name === selectedCity), [selectedCity]);
  const currentCityOffers = useMemo(() => filterOffers(offers), [filterOffers, offers]);

  if (!currentCityOffers || !currentCityOffers.length) {
    return (
      <main className={'page__main page__main--index page__main--index-empty'}>
        <Helmet>
          <title> 6 cities.</title>
        </Helmet>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList selectedCity={selectedCity} />
          </section>
        </div>
        <div className="cities">
          <NoOffers city={selectedCity} />
        </div>
      </main>
    );
  }

  const placesTitle = currentCityOffers?.length === 1 ? 'place' : 'places';
  const sortedOffers = getSortedOffers(currentCityOffers, selectedSortingOption);

  const cityLocation = CITY_LOCATIONS.find((city) => city.name === selectedCity);

  if (!cityLocation) {
    return <div>Ошибка отображения карты</div>;
  }

  return (
    <main className={'page__main page__main--index'}>
      <Helmet>
        <title> 6 cities.</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <LocationsList selectedCity={selectedCity} />
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{currentCityOffers.length} {placesTitle} to stay in {selectedCity}</b>
            <SortingForm currentOption={selectedSortingOption} onOptionClick={handleOptionClick} width={7} height={4} />
            <PlaceCardList offers={sortedOffers} onHover={handleOfferHover} classNameList={'cities__places-list'} classNameItem={'cities'} imageWidth={260} imageHeight={200} />
          </section>
          <div className="cities__right-section">
            <Map offers={currentCityOffers} city={cityLocation.location} className='cities' activeOffer={activeOffer} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
