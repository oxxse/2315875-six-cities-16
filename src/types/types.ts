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

export type City = {
  name: string;
  location: Location;
}

export type OfferPage =
  [{
    id: string;
    title: string;
    type: string;
    price: number;
    city: City;
    location: Location;
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

export type Review = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
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
