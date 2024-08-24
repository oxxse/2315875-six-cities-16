import { useRef, useEffect } from 'react';
import leaflet, { Icon, LayerGroup } from 'leaflet';
import { PlaceCard, Location } from '../../types/types';
import { MapIcon } from '../../const';

import useMap from '../../hooks/use-map';

import 'leaflet/dist/leaflet.css';

type Map = {
  activePlaceId: string | undefined;
  city: Location;
  places: PlaceCard[];
  isMainPage: boolean;
}

const defaultIcon = new Icon(MapIcon.Default);
const customIcon = new Icon(MapIcon.Active);


function Map(props: Map): JSX.Element {
  const { activePlaceId, city, places, isMainPage } = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if (map) {
      map.setView([city.latitude, city.longitude], city.zoom);
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  }, [city, map]);

  useEffect(() => {
    if (map) {
      places.forEach((place) => {
        leaflet
          .marker({
            lat: place.location.latitude,
            lng: place.location.longitude,
          }, {
            icon: place.id === activePlaceId ? customIcon : defaultIcon,
          })
          .addTo(map);
      });
    }
  }, [activePlaceId, map, places]);

  return (
    <section
      style={{ margin: '0 auto' }}
      className={`${isMainPage ? 'cities__map' : 'offer__map'} map`}
      ref={mapRef}
    />
  );
}

export default Map;
