import type { Offer } from '../../types/offer';

function OfferImage({ image }: { image: string }): JSX.Element {
  return (
    <div className="offer__image-wrapper">
      <img className="offer__image" src={image} alt="Photo studio" />
    </div>
  );
}

function OfferGallery({sources} : {sources: Offer}): JSX.Element {
  const {images} = sources;
  return (
    <div className="offer__gallery">
      {images.map((image) => <OfferImage image={image} key={image} />)}
    </div>
  );
}

export default OfferGallery;
