const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
const BASE_ACTIVE_CITY = 'Paris';
const REVIEW_COUNT = 5;
const AVATAR_URL = 'https://i.pravatar.cc/128';

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
  ReviewLengths,
  UrlMarkers,
  TileLayers,
  BASE_ACTIVE_CITY
};
