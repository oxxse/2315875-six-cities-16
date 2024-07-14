export type LocationCardProps = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type CityCardProps = {
  name: string;
  location: LocationCardProps;
}

export type OfferPage =
  [{
    id: string;
    title: string;
    type: string;
    price: number;
    city: CityCardProps;
    location: LocationCardProps;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    description: string;
    bedrooms: number;
    goods: [string];
    host: User;
    images: [string];
    maxAdults: number;
  }]

export type Offer =
  {
    id: string;
    title: string;
    type: string;
    price: number;
    city: CityCardProps;
    location: LocationCardProps;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    description: string;
    bedrooms: number;
    goods: [string];
    host: User;
    images: [string];
    maxAdults: number;
  }

export type Review = [{
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}]
