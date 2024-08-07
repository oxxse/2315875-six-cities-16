import { Link } from 'react-router-dom';

type Logo = {
  className : string;
}

function Logo({className} : Logo): JSX.Element {
  return (
    <Link to='/' className={className}>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>
  );
}

export default Logo;
