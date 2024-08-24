import CardItem from '../card-item/card-item.tsx';
import { PlaceCard } from '../../types/types.ts';

type PlaceList = {
  offers: PlaceCard[];
  classNameList: string;
  classNameItem: string;
  imageWidth: number;
  imageHeight: number;
  onHover?: (offer?: PlaceCard) => void;
};

function PlaceCardList({ offers, imageWidth, imageHeight, classNameList, classNameItem, onHover}: PlaceList): JSX.Element {
  const classes = [`${classNameList}`, 'places__list'];
  if (classNameList === 'cities__places-') {
    classes.push('tabs__content');
  }

  const handleMouseEnter = (offer: PlaceCard) => {
    if (onHover) {
      onHover(offer);
    }
  };

  const handleMouseLeave = () => {
    if (onHover) {
      onHover();
    }
  };

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
}

export default PlaceCardList;
