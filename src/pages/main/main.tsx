import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import PlaceSorting from '../../components/sorting-form/sorting-form.tsx/sorting';
import Map from '../../components/map/map';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import NoOffers from '../../components/no-offers/no-offers';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCity, selectActiveOffer, selectOffers, selectSortingOption } from '../../store/selectors';
import { Offer } from '../../types/types';
import { setCity } from '../../store/active-city';
import { SortingOption } from '../../types/types';
import { setActiveOffer } from '../../store/active-offer';
import { setSortingOption } from '../../store/sorting-option';
import { AppRoute } from '../../const';

function MainPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(selectCity).currentCity;
  const offers = useAppSelector(selectOffers).offers;
  const activeOffer = useAppSelector(selectActiveOffer);
  const selectedSortingOption = useAppSelector(selectSortingOption).selectedSortingOption;

  useEffect(() => {
    navigate(AppRoute.Main.replace(':selectedCity', selectedCity));
  }, [navigate, selectedCity]);

  const getSortedOffers = (offersToSort: Offer[], sortingOption: string): Offer[] => {
    switch (sortingOption) {
      case 'Price: low to high':
        return [...offersToSort].sort((offerA, offerB) => offerA.price - offerB.price);
      case 'Price: high to low':
        return [...offersToSort].sort((offerA, offerB) => offerB.price - offerA.price);
      case 'Top rated first':
        return [...offersToSort].sort((offerA, offerB) => offerB.rating - offerA.rating);
      default:
        return offersToSort;
    }
  };

  const filteredOffers = offers.filter((offer) => offer.city.name === selectedCity);
  const placesTitle = filteredOffers.length === 1 ? 'place' : 'places';
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const sortedOffers = getSortedOffers(filteredOffers, selectedSortingOption);

  const handleCityClick = (cityName: string) => {
    dispatch(setCity(cityName));
  };

  const handleHover = (offer?: Offer | null) => {
    dispatch(setActiveOffer(offer ?? null));
  };

  const handleOptionClick = (option: SortingOption) => dispatch(setSortingOption(option));

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
            <LocationsList selectedCity={selectedCity} onCityClick={handleCityClick} />
          </section>
        </div>
        <div className="cities">
          {filteredOffers.length &&
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} {placesTitle} to stay in {selectedCity}</b>
                <PlaceSorting width={7} height={4} currentOption={selectedSortingOption} onOptionClick={handleOptionClick} />
                <PlaceCardList offers={sortedOffers} onHover={handleHover} classNameList={'cities__places-list'} classNameItem={'cities__'} imageWidth={260} imageHeight={200} />
              </section>
              <div className="cities__right-section">
                <Map offers={sortedOffers} city={filteredOffers[0].city.location} className='cities' activeOffer={activeOffer.activeOffer} />
              </div>
            </div>}
          {!filteredOffers.length && selectedCity && <NoOffers city={selectedCity} />}
        </div>
      </main>
    </div >
  );
}

export default MainPage;
