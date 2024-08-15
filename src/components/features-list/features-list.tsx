import type { Offer } from '../../types/types';
import { capitalizeFirstLetter } from '../../utils/common';

function FeaturesList({ feature }: { feature: Offer }): JSX.Element {
  const bedroomsTitle = `${feature.bedrooms > 1 ? 'bedrooms' : 'bedroom'}`;
  const maxAdultsTitle = `${feature.maxAdults > 1 ? 'adults' : 'adult'}`;
  const hotelType = capitalizeFirstLetter(feature.type);


  const { bedrooms, maxAdults } = feature;
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">{hotelType}</li>
      <li className="offer__feature offer__feature--bedrooms">{bedrooms} {bedroomsTitle}</li>
      <li className="offer__feature offer__feature--adults">Max {maxAdults} {maxAdultsTitle}</li>
    </ul>
  );
}

export default FeaturesList;
