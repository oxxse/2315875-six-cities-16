import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setCity } from '../../store/active-main/active-main';
import { memo, useCallback } from 'react';

type Location = {
  city: string;
  isFavoritePage: boolean;
  selectedCity?: string;
}

const LocationsItem = memo(({ city, selectedCity, isFavoritePage }: Location): JSX.Element => {
  const dispatch = useAppDispatch();
  const isActive = (city === selectedCity);

  const content = (
    <NavLink className={isActive ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} to={AppRoute.Main}>
      <span>{city}</span>
    </NavLink >
  );

  const handleCityClick = useCallback(() => {
    dispatch(setCity(city));
  }, [dispatch, city]);

  return isFavoritePage ? (
    <div className="locations__item" onClick={handleCityClick}>{content}</div>
  ) : (
    <li className="locations__item" onClick={handleCityClick}>{content}</li>
  );
});

LocationsItem.displayName = 'LocationsItem';

export default LocationsItem;
