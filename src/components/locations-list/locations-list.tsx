import { CITIES } from '../../const';
import LocationsItem from '../locations-item/locations-item';

type LocationList = {
  selectedCity: string;
  onCityClick: (city: string) => void;
}

function LocationsList({ selectedCity, onCityClick }: LocationList): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => <LocationsItem city={city} isFavoritePage={false} isActive={city === selectedCity} onClick={onCityClick} key={city} />)}
    </ul>);
}

export default LocationsList;
