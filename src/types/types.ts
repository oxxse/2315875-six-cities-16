import { CITIES, PLACES_OPTIONS } from '../const';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type CommentForm = {
  rating: number;
  comment: string;
}

export type CommentData = {
  id: string;
  comment: CommentForm;
}

export type City = {
  name: typeof CITIES[number];
  location: Location;
}

export type MapIconType = {
  iconUrl: string;
  iconSize: [number, number];
  iconAnchor: [number, number];
};

export type OfferTemplate =
  {
    id: string;
    title: string;
    type: string;
    price: number;
    city: City;
    location: Location;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
  }

export type Review = CommentForm & {
  id: string;
  date: string;
  user: User;
};

export type PlaceCard = OfferTemplate & {
  previewImage: string;
};

export type Offer = OfferTemplate & {
  previewImage: string;
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
};

export type SortingOption = typeof PLACES_OPTIONS[number];
