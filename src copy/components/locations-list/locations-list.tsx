import { NavLink } from 'react-router-dom';
import { CITIES } from '../../const';

function LocationsItem({ city }: { city: string }): JSX.Element {
  return (
    <li className="locations__item">
      <NavLink className="locations__item-link tabs__item" to={city}>
        <span>{city}</span>
      </NavLink>
    </li>
  );
}

function LocationsList(): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => <LocationsItem city={city} key={city} />)}
    </ul>);
}

export default LocationsList;
