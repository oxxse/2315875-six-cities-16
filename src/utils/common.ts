import { Location } from '../types/types';
import { AuthorizationStatus } from '../const';
import { AppRoute } from '../const';

const getRandomArrayElement = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

const getRandomInteger = (max: number) => Math.floor(Math.random() * max) + 1;

const getRandomBoolean = () => Math.random() >= 0.5;

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getRandomRating = () => (Math.floor(Math.random() * 40) + 10) / 10;

const getRandomFloat = (min: number, max: number, precision: number = 2): number => parseFloat((Math.random() * (max - min) + min).toFixed(precision));

const generateHotelLocation = (cityLocation: Location): Location => {
  const latitudeOffset = getRandomFloat(-0.05, 0.05);
  const longitudeOffset = getRandomFloat(-0.05, 0.05);

  return {
    latitude: cityLocation.latitude + latitudeOffset,
    longitude: cityLocation.longitude + longitudeOffset,
    zoom: 16,
  };
};

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

export {
  getRandomArrayElement,
  getRandomInteger,
  getRandomBoolean,
  createIdGenerator,
  getRandomRating,
  generateHotelLocation,
  getMarkupRating,
  upFirstLetter,
  getAuthorizationStatus,
  getHeaderState
};
