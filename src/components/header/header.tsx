import { Link, useLocation } from 'react-router-dom';
import Logo from '../logo/logo';
import { getHeaderState } from '../../utils/common';
import { getAuthorizationStatus } from '../../utils/common';
import { AppRoute } from '../../const';
import { AuthorizationStatus } from '../../const';
import type { Offer } from '../../types/types';


type HeaderPropsType = {
  favorites?: Offer[];
}

function Header({ favorites }: HeaderPropsType): JSX.Element {
  const { pathname } = useLocation();
  const { linkClassName, shouldRenderUser } = getHeaderState(pathname as AppRoute);
  const authorizationStatus = getAuthorizationStatus();


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
                          Oliver.conner@gmail.com
                        </span><span className="header__favorite-count">{favorites ? favorites.length : ''}</span>
                      </>
                    ) : <span className="header__login">Sign in</span>}
                  </Link>
                </li>
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
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
