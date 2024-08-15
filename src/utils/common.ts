import { AuthorizationStatus } from '../const';
import { AppRoute } from '../const';
import { Offer, Review } from '../types/types';

const getMarkupRating = (rating: number) => {
  const ratingInProcents = `${(Math.floor(rating) / 5) * 100}%`;
  return { width: ratingInProcents };
};

const upFirstLetter = (str: string) => `${str[0].toUpperCase()}${str.slice(1)}`;

const getAuthorizationStatus = () => AuthorizationStatus.Auth;

const getHeaderState = (pathname: AppRoute) => {
  let linkClassName = '';
  let shouldRenderUser = true;
  const isKnownRoute = Object.values(AppRoute).some((route) =>
    route === pathname ||
    (route.includes(':id') && pathname.startsWith(route.split('/:id')[0]))
  );

  if (pathname === AppRoute.Main || AppRoute.Main.replace(':selectedCity', '')) {
    linkClassName = ' header__logo-link--active';
  } else if (pathname === AppRoute.Login) {
    shouldRenderUser = false;
  } else if (!isKnownRoute) {
    linkClassName = 'header__logo-link--active';
  }

  return {linkClassName, shouldRenderUser };
};

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

const compareDates = (reviewA: Review, reviewB: Review) => new Date(reviewB.date).getTime() - new Date(reviewA.date).getTime();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
};

const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

const groupOffersByCity = (offers: Offer[]) => offers.reduce((accumulator: Record<string, Offer[]>, offer) => {
  const cityName = offer.city.name;
  if (!accumulator[cityName]) {
    accumulator[cityName] = [];
  }
  accumulator[cityName].push(offer);
  return accumulator;
}, {} as Record<string, Offer[]>);

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
