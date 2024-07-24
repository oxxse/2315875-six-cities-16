import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';

type Location = {
  city: string;
  isFavoritePage: boolean;
}

export default function LocationsItem({ city, isFavoritePage }: Location): JSX.Element {
  const content = (
    <NavLink className={({ isActive }) => isActive ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} to={AppRoute.Main.replace(':selectedCity', city)}>
      <span>{city}</span>
    </NavLink >
  );

  return isFavoritePage ? (
    <div className="locations__item">{content}</div>
  ) : (
    <li className="locations__item">{content}</li>
  );
}
