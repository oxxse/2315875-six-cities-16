import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { BASE_ACTIVE_CITY } from '../../const';

type Logo = {
  className : string;
}

function Logo({className} : Logo): JSX.Element {
  return (
    <Link to={AppRoute.Main.replace(':selectedCity', BASE_ACTIVE_CITY)} className={className}>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>
  );
}

export default Logo;
