import { PlaceCard } from '../../types/types.ts';
import { useEffect, useState } from 'react';
import { Nullable } from 'vitest';
import CardItem from '../card-item/card-item.tsx';

type PlaceListProps = {
  offers: PlaceCard[];
  className: string;
  imageWidth: number;
  imageHeight: number;
};

function PlaceCardList({ offers, imageWidth, imageHeight, className}: PlaceListProps): JSX.Element {
  const classes = [`${className}__places-list`, 'places__list'];
  if (className === 'cities') {
    classes.push('tabs__content');
  }

  const [ activeOffer, setActiveOffer ] = useState<Nullable<PlaceCard>>(null);

  const handleHover = (offer?: PlaceCard) => {
    setActiveOffer(offer || null);
  };

  useEffect(() => {}, [activeOffer]);

  return (
    <div className={classes.join(' ')}>
      {offers.map((offer) => (
        <CardItem
          key={offer.id}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
          className={className}
          {...offer}
          onMouseOver={() => handleHover(offer)}
          onMouseLeave={() => handleHover()}
        />
      ))}
    </div>
  );
}

export default PlaceCardList;
