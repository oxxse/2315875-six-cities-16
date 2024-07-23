import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type Location = {
  city: string;
  isFavoritePage: boolean;
  isActive?: boolean;
  onClick?: (city: string) => void | undefined;
}

export default function LocationsItem({ city, isFavoritePage, isActive, onClick }: Location): JSX.Element {
  const content = (
    <Link className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} to={ `${AppRoute.Main}${city}` }>
      <span>{city}</span>
    </Link >
  );

  const handleOnClick = () => {
    if (onClick) {
      onClick(city);
    }
  };

  return isFavoritePage ? (
    <div className="locations__item" onClick={handleOnClick}>{content}</div>
  ) : (
    <li className="locations__item" onClick={handleOnClick}>{content}</li>
  );
}
