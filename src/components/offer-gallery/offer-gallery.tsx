import { memo } from 'react';

type OfferImage = {
  image: string;
};

type OfferGallery = {
  images: string[];
};


const OfferImage = memo(({ image }: OfferImage): JSX.Element => (
  <div className="offer__image-wrapper">
    <img className="offer__image" src={image} alt="Photo studio" />
  </div>
));

OfferImage.displayName = 'OfferImage';

const OfferGallery = memo(({ images }: OfferGallery): JSX.Element => (
  <div className="offer__gallery">
    {images.map((image) => <OfferImage image={image} key={image} />)}
  </div>
));

OfferGallery.displayName = 'OfferGallery';

export default OfferGallery;
