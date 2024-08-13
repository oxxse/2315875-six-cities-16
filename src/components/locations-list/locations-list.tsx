import { CITIES } from '../../const';
import LocationsItem from '../locations-item/locations-item';

type LocationList = {
  onCityClick: (city: string) => void;
  selectedCity: string;
}


function LocationsList({onCityClick, selectedCity} : LocationList): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => <LocationsItem selectedCity = {selectedCity} onClick={onCityClick} isFavoritePage = {false} city={city} key={city} />)}
    </ul>);
}

export default LocationsList;
