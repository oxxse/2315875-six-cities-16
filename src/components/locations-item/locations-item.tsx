import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setCity } from '../../store/active-city';

type Location = {
  city: string;
  isFavoritePage: boolean;
  selectedCity?: string;
}

export default function LocationsItem({ city, selectedCity, isFavoritePage}: Location): JSX.Element {
  const dispatch = useAppDispatch();
  const isActive = (city === selectedCity);

  const content = (
    <NavLink className={isActive ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} to={AppRoute.Main.replace(':selectedCity', city)}>
      <span>{city}</span>
    </NavLink >
  );

  const handleCityClick = () => {
    dispatch(setCity(city));
  };

  return isFavoritePage ? (
    <div className="locations__item" onClick={handleCityClick}>{content}</div>
  ) : (
    <li className="locations__item" onClick={handleCityClick}>{content}</li>
  );
}
