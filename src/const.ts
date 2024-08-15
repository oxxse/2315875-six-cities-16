const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
const BASE_ACTIVE_CITY = 'Paris';
const TIMEOUT_SHOW_ERROR = 5000;
const PASSWORD_REGEXP = /^.*(?=.*[a-zA-Z])(?=.*\d).*$/;
const MAX_REVIEWS_COUNT = 10;

enum ReviewLengths {
  MinLength = 50,
  MaxLength = 300
}

enum UrlMarkers {
  UrlMarkerDefault = 'markup/img/pin.svg',
  UrlMarkerCurrent = 'markup/img/pin-active.svg'
}

enum TileLayers {
  TileLayerUrlPattern = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  TileLayerAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}

enum AppRoute {
  Root = '/',
  Main = '/:selectedCity',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Error = '/error'
}

enum ApiRoute {
  Offers = '/offers',
  Login = '/login',
  Favorites = '/favorite',
  Logout = '/logout',
  Comments = '/comments'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const PLACES_OPTIONS = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

const RATING_TITLES = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

const MAX_NEARBY_OFFERS_COUNT = 3;
const MAX_IMAGES_COUNT = 6;

export {
  AppRoute,
  ApiRoute,
  AuthorizationStatus,
  CITIES,
  PLACES_OPTIONS,
  RATING_TITLES,
  ReviewLengths,
  UrlMarkers,
  TileLayers,
  BASE_ACTIVE_CITY,
  TIMEOUT_SHOW_ERROR,
  MAX_NEARBY_OFFERS_COUNT,
  MAX_IMAGES_COUNT,
  PASSWORD_REGEXP,
  MAX_REVIEWS_COUNT
};
