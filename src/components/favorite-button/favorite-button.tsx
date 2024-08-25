import React, { memo, useCallback } from 'react';
import { useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { toggleFavoriteStatus } from '../../store/thunk-actions';
import { AppRoute } from '../../const';
import { useAuthorization } from '../../hooks/use-authorization';

type FavoriteButton = {
  offerId: string;
  isFavorite: boolean;
  buttonType: 'offer' | 'card';
  width: number;
  height: number;
};

const FavoriteButton: React.FC<FavoriteButton> = memo(({ offerId, isFavorite, buttonType, width, height } : FavoriteButton) : JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAuthorization();

  const handleClick = useCallback(() => {
    if (isAuth) {
      const status = (isFavorite) ? 0 : 1;
      dispatch(toggleFavoriteStatus({ offerId: offerId, status: status }));
    } else {
      navigate(AppRoute.Login);
    }
  }, [dispatch, isAuth, isFavorite, navigate, offerId]);

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
});

FavoriteButton.displayName = 'FavoriteButton';

export default FavoriteButton;
