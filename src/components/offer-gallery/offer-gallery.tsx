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

function OfferImage({ image }: { image: string }): JSX.Element {
  return (
    <div className="offer__image-wrapper">
      <img className="offer__image" src={image} alt="Photo studio" />
    </div>
  );
}

function OfferGallery({sources} : {sources: OfferPage}): JSX.Element {
  const {images} = sources;
  return (
    <div className="offer__gallery">
      {images.map((image) => <OfferImage image={image} key={image} />)}
    </div>
  );
}

export default OfferGallery;
