import { Link } from 'react-router-dom';
import { PlaceCard } from '../../types/types';
import { AppRoute } from '../../const';
import { getAuthorizationStatus, getMarkupRating, upFirstLetter } from '../../utils/common';
import FavoriteButton from '../favorite-button/favorite-button';
import { AuthorizationStatus } from '../../const';

type Card = {
  imageWidth: number;
  imageHeight: number;
  className: string;
  onMouseOver: () => void;
  onMouseLeave: () => void;
}

type PlaceCardType = PlaceCard & Card;

const authorizationStatus = getAuthorizationStatus();

function CardItem({ imageWidth, imageHeight, className, title, type, price, isFavorite, isPremium, previewImage, rating, id, onMouseOver, onMouseLeave }: PlaceCardType): JSX.Element {

  return (
    <article className={`${className}__card place-card`}
      onMouseOver={onMouseOver}
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
          {authorizationStatus === AuthorizationStatus.Auth ? <FavoriteButton className={className} isFavorite={isFavorite}/> : <Link to={AppRoute.Login}><FavoriteButton className={className} isFavorite={false}/></Link>}
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
        <p className="place-card__type">{upFirstLetter(type)}</p>
      </div>
    </article >
  );
}

export default CardItem;
