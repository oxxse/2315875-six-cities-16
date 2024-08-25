import PlaceCardList from '../place-card-list/place-card-list';
import LocationsItem from '../locations-item/locations-item';
import { PlaceCard } from '../../types/types';
import { memo } from 'react';

type FavoritePlace = {
  city: string;
  offers: PlaceCard[];
};

const FavoritePlace = memo(({ city, offers }: FavoritePlace): JSX.Element => (
  <li className="favorites__locations-items">
    <div className="favorites__locations locations locations--current">
      <LocationsItem city={city} isFavoritePage key={city} />
    </div>
    <PlaceCardList offers={offers} classNameList="favorites__places" classNameItem='favorites' imageWidth={150} imageHeight={110} />
  </li>
));

FavoritePlace.displayName = 'FavoritePlace';

export default FavoritePlace;
