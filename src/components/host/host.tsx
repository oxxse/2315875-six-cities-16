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

function Host ({hostData} : {hostData : OfferPage}) : JSX.Element {
  const { host } = hostData;
  return (
    <div className="offer__host-user user">
      <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
        <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
      </div>
      <span className="offer__user-name">
        {host.name}
      </span>
      <span className="offer__user-status">
        Pro
      </span>
    </div>
  );
}

export default Host;
