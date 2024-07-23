import PlaceCardList from '../place-card-list/place-card-list';
import LocationsItem from '../locations-item/locations-item';
import { Offer } from '../../types/types';

type FavoritePlaceProps = {
  city: string;
  offers: Offer[];
};

type FavoritePlacesListProps = {
  groupedOffers: Record<string, Offer[]>;
};

function FavoritePlace({ city, offers }: FavoritePlaceProps): JSX.Element {

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <LocationsItem city={city} isFavoritePage key={city} />
      </div>
      <PlaceCardList offers={offers} className="favorites" imageWidth={150} imageHeight={110} />
    </li>
  );
}

function FavoritePlacesList({groupedOffers}: FavoritePlacesListProps): JSX.Element {
  return (
    <ul className="favorites__list">
      {Object.entries(groupedOffers).map(([city, cityOffers]) => (
        <FavoritePlace key={city} city={city} offers={cityOffers} />
      ))}
    </ul>
  );
}

export default FavoritePlacesList;
