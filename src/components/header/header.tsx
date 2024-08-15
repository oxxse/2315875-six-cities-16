import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../logo/logo';
import { getHeaderState } from '../../utils/common';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectAuthorizationStatus } from '../../store/auth/auth-selector';
import { AppRoute } from '../../const';
import { AuthorizationStatus } from '../../const';
import { selectUser } from '../../store/user/user-selector';
import { fetchFavoriteOffers, logoutAction } from '../../store/thunk-actions';
import { selectFavoriteOffers } from '../../store/offers/offer-selector';

function Header(): JSX.Element {
  const { pathname } = useLocation();
  const { linkClassName, shouldRenderUser } = getHeaderState(pathname as AppRoute);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffers());
    }
  }, [dispatch, authorizationStatus]);

  const favoriteOffers = useAppSelector(selectFavoriteOffers);

  const handleLogoutClick = () => {
    dispatch(logoutAction()).then(() => {
      if (pathname.toString() === AppRoute.Favorites.toString()) {
        navigate(AppRoute.Login);
      } else {
        navigate(pathname);
      }
    });
  };

  const userEmail = user ? user.email : '';

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo className={`header__logo-link ${linkClassName}`} />
          </div>
          {shouldRenderUser ? (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    {authorizationStatus === AuthorizationStatus.Auth ? (
                      <>
                        <span className="header__user-name user__name">
                          {userEmail}
                        </span><span className="header__favorite-count">{favoriteOffers ? favoriteOffers.length : ''}</span>
                      </>
                    ) : <span className="header__login">Sign in</span>}
                  </Link>
                </li>
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <li className="header__nav-item">
                    <button type='button' className="header__nav-link button" onClick={handleLogoutClick}>
                      <span className="header__signout">Sign out</span>
                    </button>
                  </li>
                ) : ''}
              </ul>
            </nav>
          ) : ''}
        </div>
      </div>
    </header>);
}

export default Header;
