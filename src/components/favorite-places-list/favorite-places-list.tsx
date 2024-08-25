import FavoritePlace from '../favorite-place/favorite-place';
import { PlaceCard } from '../../types/types';
import { groupOffersByCity } from '../../utils/common';
import { memo } from 'react';

type FavoritePlacesList = {
  offers: PlaceCard[];
};

const FavoritePlacesList = memo(({ offers }: FavoritePlacesList): JSX.Element => {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const groupedOffers = groupOffersByCity(favoriteOffers);

  return (
    <ul className="favorites__list">
      {Object.entries(groupedOffers).map(([city, cityOffers]) => (
        <FavoritePlace key={city} city={city} offers={cityOffers} />
      ))}
    </ul>
  );
});

FavoritePlacesList.displayName = 'FavoritePlacesList';

export default FavoritePlacesList;
