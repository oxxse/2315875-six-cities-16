import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type Logo = {
  className : string;
}

function Logo({className} : Logo): JSX.Element {
  return (
    <Link to={AppRoute.Main} className={className}>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>
  );
}

export default Logo;
