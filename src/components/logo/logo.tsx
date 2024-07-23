import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';

function Logo(): JSX.Element {
  return (
    <NavLink to={AppRoute.Main} className={({isActive}) => isActive ? 'header__logo-link  header__logo-link--active' : 'header__logo-link'}>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </NavLink>
  );
}

export default Logo;
