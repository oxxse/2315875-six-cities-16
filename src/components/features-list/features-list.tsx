type LocationCardProps = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type HostProps = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

type CityCardProps = {
  name: string;
  location: LocationCardProps;
}

type OfferPage =
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
    host: HostProps;
    images: [string];
    maxAdults: number;
  }

function FeaturesList({ feature }: { feature: OfferPage }): JSX.Element {
  const { type, bedrooms, maxAdults } = feature;
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">{type}</li>
      <li className="offer__feature offer__feature--bedrooms">{bedrooms} Bedrooms</li>
      <li className="offer__feature offer__feature--adults">Max {maxAdults} adults</li>
    </ul>
  )
}

export default FeaturesList
