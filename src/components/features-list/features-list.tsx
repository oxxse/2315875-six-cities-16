import type { Offer } from '../../types/offer';

function FeaturesList({ feature }: { feature: Offer }): JSX.Element {

  const { type, bedrooms, maxAdults } = feature;
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">{type}</li>
      <li className="offer__feature offer__feature--bedrooms">{bedrooms} Bedrooms</li>
      <li className="offer__feature offer__feature--adults">Max {maxAdults} adults</li>
    </ul>
  );
}

export default FeaturesList;
