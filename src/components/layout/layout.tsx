import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import Logo from '../logo/logo';
import { getHeaderState } from '../../utils/common';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AppRoute } from '../../const';
import { selectUser } from '../../store/user/user-selectors';
import { logoutAction } from '../../store/thunk-actions';
import { selectFavoriteOffers } from '../../store/offers/offers-selectors';
import { useAuthorization } from '../../hooks/use-authorization';
import { useCallback } from 'react';

const Layout = ((): JSX.Element => {
  const { pathname } = useLocation();
  const currentPage = pathname as AppRoute;
  const { rootClassName, linkClassName, shouldRenderUser } = getHeaderState(currentPage);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const favorites = useAppSelector(selectFavoriteOffers);
  const isAuth = useAuthorization();

  const handleLogoutClick = useCallback(() => {
    dispatch(logoutAction()).then(() => {
      if (isAuth) {
        navigate(AppRoute.Login);
      } else {
        navigate(pathname);
      }
    });
  }, [dispatch, isAuth, navigate, pathname]);

  const userEmail = user ? user.email : '';

  return (
    <div className={rootClassName}>
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
                      {isAuth ? (
                        <>
                          <span className="header__user-name user__name">
                            {userEmail}
                          </span><span className="header__favorite-count">{favorites.length}</span>
                        </>
                      ) : <span className="header__login">Sign in</span>}
                    </Link>
                  </li>
                  {isAuth ? (
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
      </header>
      <Outlet />
    </div>);
});

export default Layout;
