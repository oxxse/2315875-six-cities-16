const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

export const CITY_LOCATIONS = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  }
] as const;

const MAX_REVIEWS_COUNT = 10;

const ReviewLength = {
  Min: 50,
  Max: 300
} as const;

const MapIconData = {
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
} as const;

const MapIcon = {
  Default: {
    iconUrl: 'img/pin.svg',
    MapIconData
  },
  Active: {
    iconUrl: 'img/pin-active.svg',
    MapIconData
  },
} as const;

const TileLayerUrl = {
  Pattern:
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  Attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
} as const;

enum AppRoute {
  Main = '/',
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

enum NameSpace {
  Offers = 'offers',
  Offer = 'offer',
  User = 'user',
  Error = 'error',
  ActiveMain = 'activeMain'
}

const PLACES_OPTIONS = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

const RatingTitles = {
  '1': 'terribly',
  '2': 'badly',
  '3': 'not bad',
  '4': 'good',
  '5': 'perfect'
} as const;

const MAX_NEARBY_OFFERS_COUNT = 3;
const MAX_IMAGES_COUNT = 6;

export {
  AppRoute,
  ApiRoute,
  AuthorizationStatus,
  CITIES,
  PLACES_OPTIONS,
  RatingTitles,
  ReviewLength,
  MapIcon,
  TileLayerUrl,
  NameSpace,
  MAX_NEARBY_OFFERS_COUNT,
  MAX_IMAGES_COUNT,
  MAX_REVIEWS_COUNT,
};
