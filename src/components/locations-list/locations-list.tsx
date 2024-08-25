import { memo } from 'react';
import { CITIES } from '../../const';
import LocationsItem from '../locations-item/locations-item';

type LocationList = {
  selectedCity: string;
}

const LocationsList = memo(({ selectedCity }: LocationList): JSX.Element => (
  <ul className="locations__list tabs__list">
    {CITIES.map((city) => <LocationsItem selectedCity={selectedCity} isFavoritePage={false} city={city} key={city} />)}
  </ul>
));

LocationsList.displayName = 'LocationsList';

export default LocationsList;
