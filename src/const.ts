const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
const REVIEW_COUNT = 5;
const AVATAR_URL = 'https://i.pravatar.cc/128';
const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;


enum AppRoute {
  Main = '/:selectedCity',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Error = '/error'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const TYPES = ['Room', 'Apartment', 'House', 'Hotel'];

const PLACES_OPTIONS = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

const RATING_TITLES = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

export {
  AppRoute,
  AuthorizationStatus,
  REVIEW_COUNT,
  CITIES,
  TYPES,
  PLACES_OPTIONS,
  RATING_TITLES,
  AVATAR_URL,
  MIN_REVIEW_LENGTH,
  MAX_REVIEW_LENGTH,
};
