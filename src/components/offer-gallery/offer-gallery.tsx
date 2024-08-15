type OfferImage = {
  image: string;
};

type OfferGallery = {
  images: string[];
};


function OfferImage({image} : OfferImage) : JSX.Element {
  return (
    <div className="offer__image-wrapper">
      <img className="offer__image" src={image} alt="Photo studio" />
    </div>
  );
}

function OfferGallery({images} : OfferGallery): JSX.Element {

  return (
    <div className="offer__gallery">
      {images.map((image) => <OfferImage image={image} key={image}/>)}
    </div>
  );
}

export default OfferGallery;
