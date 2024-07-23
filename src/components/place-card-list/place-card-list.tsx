import { PlaceCard } from '../../types/types.ts';
import { useEffect, useState } from 'react';
import { Nullable } from 'vitest';
import CardItem from '../card-item/card-item.tsx';

type PlaceList = {
  offers: PlaceCard[];
  classNameList: string;
  classNameItem: string;
  imageWidth: number;
  imageHeight: number;
};

function PlaceCardList({ offers, imageWidth, imageHeight, classNameList, classNameItem}: PlaceList): JSX.Element {
  const classes = [`${classNameList}`, 'places__list'];
  if (classNameList === 'cities__places-') {
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
          className={classNameItem}
          {...offer}
          onMouseOver={() => handleHover(offer)}
          onMouseLeave={() => handleHover()}
        />
      ))}
    </div>
  );
}

export default PlaceCardList;
