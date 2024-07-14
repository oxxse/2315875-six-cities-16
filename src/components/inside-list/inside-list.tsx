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

function InsideItem({ good }: { good: string }): JSX.Element {
  return (
    <li className="offer__inside-item">{good}</li>
  );
}

function InsideList({ items }: { items: OfferPage }): JSX.Element {
  const { goods } = items;
  return (
    <ul className="offer__inside-list">
      {goods.map((good) => <InsideItem good={good} key={good} />)}
    </ul>
  );
}

export default InsideList;
