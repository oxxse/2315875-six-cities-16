import CardItem from '../card-item/card-item.tsx';
import { PlaceCard } from '../../types/types.ts';
import { memo, useCallback } from 'react';

type PlaceList = {
  offers: PlaceCard[];
  classNameList: string;
  classNameItem: string;
  imageWidth: number;
  imageHeight: number;
  onHover?: (offer?: PlaceCard) => void;
};

const PlaceCardList = memo(({ offers, imageWidth, imageHeight, classNameList, classNameItem, onHover}: PlaceList): JSX.Element => {
  const classes = [`${classNameList}`, 'places__list'];
  if (classNameList === 'cities__places-') {
    classes.push('tabs__content');
  }

  const handleMouseEnter = useCallback((offer: PlaceCard) => {
    if (onHover) {
      onHover(offer);
    }
  }, [onHover]);

  const handleMouseLeave = useCallback(() => {
    if (onHover) {
      onHover();
    }
  }, [onHover]);

  return (
    <div className={classes.join(' ')}>
      {offers.map((offer) => (
        <CardItem
          key={offer.id}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
          className={classNameItem}
          {...offer}
          onMouseEnter={() => handleMouseEnter(offer)}
          onMouseLeave={() => handleMouseLeave()}
        />
      ))}
    </div>
  );
});

PlaceCardList.displayName = 'PlaceCardList';

export default PlaceCardList;
