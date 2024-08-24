import PlaceCardList from '../place-card-list/place-card-list';
import LocationsItem from '../locations-item/locations-item';
import { PlaceCard } from '../../types/types';
import { groupOffersByCity } from '../../utils/common';

type FavoritePlace = {
  city: string;
  offers: PlaceCard[];
};

type FavoritePlacesList = {
  offers: PlaceCard[];
};

function FavoritePlace({ city, offers }: FavoritePlace): JSX.Element {

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <LocationsItem city={city} isFavoritePage key={city} />
      </div>
      <PlaceCardList offers={offers} classNameList="favorites__places" classNameItem='favorites__' imageWidth={150} imageHeight={110} />
    </li>
  );
}

function FavoritePlacesList({offers}: FavoritePlacesList): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const groupedOffers = groupOffersByCity(favoriteOffers);

  return(
    <ul className="favorites__list">
      {Object.entries(groupedOffers).map(([city, cityOffers]) => (
        <FavoritePlace key={city} city={city} offers={cityOffers}/>
      ))}
    </ul>
  );
}

export default FavoritePlacesList;
