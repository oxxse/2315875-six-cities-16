import { AuthorizationStatus, CITIES } from '../const';
import { AppRoute } from '../const';
import { PlaceCard, Review } from '../types/types';
import classNames from 'classnames';

const getMarkupRating = (rating: number) => {
  const ratingInProcents = `${Math.round(rating) * 20}%`;
  return { width: ratingInProcents };
};

const upFirstLetter = (str: string) => `${str[0].toUpperCase()}${str.slice(1)}`;

const getAuthorizationStatus = () => AuthorizationStatus.Auth;

const getHeaderState = (pathname: AppRoute) => {
  const isMain = pathname === AppRoute.Main;
  const isLogin = pathname === AppRoute.Login;
  const isKnownRoute = Object.values(AppRoute).some((route) =>
    route === pathname ||
    (route.includes(':id') && pathname.startsWith(route.split('/:id')[0]))
  );

  const rootClassName = classNames('page', {
    'page--main': isMain || !isKnownRoute,
    'page--gray': isMain || isLogin,
    'page--login': isLogin,
  });

  const linkClassName = classNames('header__logo-link', {
    'header__logo-link--active': isMain || !isKnownRoute,
  });

  const shouldRenderUser = !isLogin;

  return {rootClassName, linkClassName, shouldRenderUser };
};

const getSortedOffers = (offersToSort: PlaceCard[], sortingOption: string): PlaceCard[] => {
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

const compareDates = (reviewA: Review, reviewB: Review) => new Date(reviewB.date).getTime() - new Date(reviewA.date).getTime();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
};

const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

const groupOffersByCity = (offers: PlaceCard[]) => offers.reduce((accumulator: Record<typeof CITIES[number], PlaceCard[]>, offer) => {
  const cityName = offer.city.name;
  if (!accumulator[cityName]) {
    accumulator[cityName] = [];
  }
  accumulator[cityName].push(offer);
  return accumulator;
}, {} as Record<typeof CITIES[number], PlaceCard[]>);

export {
  getMarkupRating,
  upFirstLetter,
  getAuthorizationStatus,
  getHeaderState,
  getSortedOffers,
  capitalizeFirstLetter,
  groupOffersByCity,
  compareDates,
  formatDate
};
