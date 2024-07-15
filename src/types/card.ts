import type { LocationCardProps } from './offer';
import type { CityCardProps } from './offer';

export type PlaceCardProps = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityCardProps;
  location: LocationCardProps;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};
