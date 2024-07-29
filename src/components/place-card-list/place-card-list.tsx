import CardItem from '../card-item/card-item.tsx';
import { Offer } from '../../types/types.ts';

type PlaceList = {
  offers: Offer[];
  classNameList: string;
  classNameItem: string;
  imageWidth: number;
  imageHeight: number;
  onHover?: (offer?: Offer) => void;
};

function PlaceCardList({ offers, imageWidth, imageHeight, classNameList, classNameItem, onHover}: PlaceList): JSX.Element {
  const classes = [`${classNameList}`, 'places__list'];
  if (classNameList === 'cities__places-') {
    classes.push('tabs__content');
  }

  const handleMouseEnter = (offer: Offer) => {
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
