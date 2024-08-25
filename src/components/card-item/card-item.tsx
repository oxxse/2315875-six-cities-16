import { Link } from 'react-router-dom';
import { PlaceCard } from '../../types/types';
import { AppRoute } from '../../const';
import { getMarkupRating, capitalizeFirstLetter } from '../../utils/common';
import FavoriteButton from '../favorite-button/favorite-button';
import { memo } from 'react';


type Card = {
  imageWidth: number;
  imageHeight: number;
  className: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

type PlaceCardType = PlaceCard & Card;

const CardItem = memo(({ imageWidth, imageHeight, className, title, type, price, isFavorite, isPremium, previewImage, rating, id, onMouseEnter, onMouseLeave }: PlaceCardType): JSX.Element => {
  const hotelType = capitalizeFirstLetter(type);

  return (
    <article className={`${className}card place-card`}
      onMouseOver={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <Link to={AppRoute.Offer.replace(':id', id)}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imageWidth}
            height={imageHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <FavoriteButton offerId={id} isFavorite={isFavorite} buttonType="card" width={18} height={19} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={getMarkupRating(rating)}></span>
            <span className="visually-hidden">{rating}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer.replace(':id', id)}>{title}</Link>
        </h2>
        <p className="place-card__type">{hotelType}</p>
      </div>
    </article >
  );
});

CardItem.displayName = 'CardItem';

export default CardItem;
