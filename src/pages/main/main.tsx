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
import { selectCity } from '../../store/active-city/active-sity-selector';
import { selectActiveOffer } from '../../store/active-offer/active-offer-selector';
import { selectOffers, selectOffersDataLoading } from '../../store/offers/offer-selector';
import { selectSortingOption } from '../../store/sorting-option/sorting-option-selector';
import { Offer } from '../../types/types';
import { SortingOption } from '../../types/types';
import { setActiveOffer } from '../../store/active-offer/active-offer';
import { setSortingOption } from '../../store/sorting-option/sorting-option';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getSortedOffers } from '../../utils/common';
import { selectAuthorizationStatus } from '../../store/auth/auth-selector';
import Spinner from '../../components/spinner/spinner';

function MainPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(selectCity);
  const offers = useAppSelector(selectOffers);
  const activeOffer = useAppSelector(selectActiveOffer);
  const selectedSortingOption = useAppSelector(selectSortingOption);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(selectOffersDataLoading);

  useEffect(() => {
    navigate(AppRoute.Main.replace(':selectedCity', selectedCity));
  }, [navigate, selectedCity]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <Spinner />
    );
  }

  const filteredOffers = offers.filter((offer) => offer.city.name === selectedCity);
  const placesTitle = filteredOffers.length === 1 ? 'place' : 'places';
  const sortedOffers = getSortedOffers(filteredOffers, selectedSortingOption);
  const city = filteredOffers[0].city.location;

  if (!city) {
    return <div>City not found</div>;
  }

  const handleOfferHover = (offer?: Offer | null) => {
    dispatch(setActiveOffer(offer ?? null));
  };

  const handleOptionClick = (option: SortingOption) => dispatch(setSortingOption(option));

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title> 6 cities.</title>
      </Helmet>
      <Header/>
      <main className={`page__main page__main--index ${!filteredOffers && 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList selectedCity={selectedCity} />
          </section>
        </div>
        <div className="cities">
          {filteredOffers.length &&
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} {placesTitle} to stay in {selectedCity}</b>
                <PlaceSorting width={7} height={4} currentOption={selectedSortingOption} onOptionClick={handleOptionClick} />
                <PlaceCardList offers={sortedOffers} onHover={handleOfferHover} classNameList={'cities__places-list'} classNameItem={'cities__'} imageWidth={260} imageHeight={200} />
              </section>
              <div className="cities__right-section">
                <Map offers={filteredOffers} city={city} className='cities' activeOffer={activeOffer} />
              </div>
            </div>}
          {!filteredOffers.length && selectedCity && <NoOffers city={selectedCity} />}
        </div>
      </main>
    </div >
  );
}

export default MainPage;
