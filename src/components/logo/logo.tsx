import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, BASE_ACTIVE_CITY } from '../../const';

type Logo = {
  className: string;
}

const Logo = memo(({ className }: Logo): JSX.Element => (
  <Link to={AppRoute.Main.replace(':selectedCity', BASE_ACTIVE_CITY)} className={className}>
    <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
  </Link>
));

Logo.displayName = 'Logo';

export default Logo;
