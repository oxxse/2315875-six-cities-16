import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { selectAuthorizationStatus } from '../../store/auth/auth-selector';
import { toggleFavoriteStatus } from '../../store/thunk-actions';
import { AuthorizationStatus, AppRoute } from '../../const';

type FavoriteButton = {
  offerId: string;
  isFavorite: boolean;
  buttonType: 'offer' | 'card';
  width: number;
  height: number;
};

const FavoriteButton: React.FC<FavoriteButton> = ({ offerId, isFavorite, buttonType, width, height }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  const handleClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(toggleFavoriteStatus({ offerId, status: !isFavorite }));
    } else {
      navigate(AppRoute.Login);
    }
  };

  const getButtonClass = () => {
    let baseClass = 'button';
    if (buttonType === 'offer') {
      baseClass += ` offer__bookmark-button ${isFavorite ? 'offer__bookmark-button--active' : ''}`;
    } else if (buttonType === 'card') {
      baseClass += ` place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`;
    } else if (buttonType === 'favorite') {
      baseClass += ` favorites__locations-items place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`;
    }
    return baseClass;
  };

  return (
    <button className={getButtonClass()} type="button" onClick={handleClick}>
      <svg className={buttonType === 'offer' ? 'offer__bookmark-icon' : 'place-card__bookmark-icon'} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
};

export default FavoriteButton;
