import { CITIES } from '../../const';
import LocationsItem from '../locations-item/locations-item';

type LocationList = {
  selectedCity: string;
}


function LocationsList({ selectedCity} : LocationList): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => <LocationsItem selectedCity = {selectedCity} isFavoritePage = {false} city={city} key={city} />)}
    </ul>);
}

export default LocationsList;
