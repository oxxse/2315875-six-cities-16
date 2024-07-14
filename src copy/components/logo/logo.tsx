import { NavLink } from 'react-router-dom';

function Logo(): JSX.Element {
  return (
    <NavLink to="/" className="header__logo-link header__logo-link--active">
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </NavLink>
  );
}

export default Logo;
