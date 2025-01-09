import React, { memo, useCallback } from 'react';
import { useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAuthorization } from '../../hooks/use-authorization';
import { selectFavoriteTogglingStatus } from '../../store/offers/offers-selectors';
import { toast } from 'react-toastify';

type FavoriteButton = {
  isFavorite: boolean;
  buttonType: 'offer' | 'card';
  width: number;
  height: number;
};

const FavoriteButton: React.FC<FavoriteButton> = memo(
  ({
    isFavorite,
    buttonType,
    width,
    height,
  }: FavoriteButton): JSX.Element => {
    const navigate = useNavigate();
    const isAuthorized = useAuthorization();
    const isToggling = useAppSelector(selectFavoriteTogglingStatus);
    const userAgent = navigator.userAgent;
    const isSafari = !!userAgent.match(/Version\/[\d.]+.*Safari/);
    const isIphone = /iP(od|hone)/i.test(userAgent) && isSafari;

    const handleButtonClick = useCallback(() => {
      if (isAuthorized) {
        try {
          if (isSafari || isIphone) {
            const clipboardItem = new ClipboardItem({
              'text/plain': new Promise((resolve) => {
                const status = isFavorite ? '0' : '1';
                resolve(new Blob([status]));
              }),
            });
            navigator.clipboard.write([clipboardItem]).then(() => {
              toast.warn('meow');
            });
          } else {
            const status = isFavorite ? '0' : '1';
            setTimeout(() => {
              navigator.clipboard.writeText(status).then(() => {
                toast.warn('meow2');
              });
            });
          }
        } catch (error) {
          toast.error('hgg');
        }
        //dispatch(toggleFavoriteStatus({ offerId: offerId, status: status }));
      } else {
        navigate(AppRoute.Login);
      }
    }, [isAuthorized, isFavorite, isIphone, isSafari, navigate]);

    const getButtonClass = () => {
      let baseClass = 'button';
      if (buttonType === 'offer') {
        baseClass += ` offer__bookmark-button ${
          isFavorite ? 'offer__bookmark-button--active' : ''
        }`;
      } else if (buttonType === 'card') {
        baseClass += ` place-card__bookmark-button ${
          isFavorite ? 'place-card__bookmark-button--active' : ''
        }`;
      } else if (buttonType === 'favorite') {
        baseClass += ` favorites__locations-items place-card__bookmark-button ${
          isFavorite ? 'place-card__bookmark-button--active' : ''
        }`;
      }
      return baseClass;
    };

    return (
      <button
        className={getButtonClass()}
        type="button"
        onClick={handleButtonClick}
        disabled={isToggling}
      >
        <svg
          className={
            buttonType === 'offer'
              ? 'offer__bookmark-icon'
              : 'place-card__bookmark-icon'
          }
          width={width}
          height={height}
        >
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">
          {isFavorite ? 'In bookmarks' : 'To bookmarks'}
        </span>
      </button>
    );
  }
);

FavoriteButton.displayName = 'FavoriteButton';

export default FavoriteButton;
