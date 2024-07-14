import { CITIES } from '../../const';

function LocationsItem({ city }: { city: string }): JSX.Element {
  return (
    <li className="locations__item">
      <a className="locations__item-link tabs__item" href="#">
        <span>{city}</span>
      </a>
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
