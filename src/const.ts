const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
const BASE_ACTIVE_CITY = 'Amsterdam';
const REVIEW_COUNT = 5;
const AVATAR_URL = 'https://i.pravatar.cc/128';
const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;
const URL_MARKER_DEFAULT = 'markup/img/pin.svg';
const URL_MARKER_CURRENT = 'markup/img/pin-active.svg';
const TILE_LAYER_URL_PATTERN = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';


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
  URL_MARKER_CURRENT,
  URL_MARKER_DEFAULT,
  TILE_LAYER_ATTRIBUTION,
  TILE_LAYER_URL_PATTERN,
  BASE_ACTIVE_CITY
};
