import { CITIES } from '../../const';
import LocationsItem from '../locations-item/locations-item';

function LocationsList(): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => <LocationsItem city={city} isFavoritePage={false} key={city} />)}
    </ul>);
}

export default LocationsList;
