import { useEffect, useState, useRef } from 'react';
import leaflet, { Map } from 'leaflet';
import { TitleLayerUrl } from '../const.ts';
import { Location } from '../types/types.ts';

function useMap(
  mapRef: React.RefObject<HTMLElement | null>,
  city: Location
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.latitude,
          lng: city.longitude,
        },
        zoom: city.zoom,
      });

      leaflet
        .tileLayer(TitleLayerUrl.Pattern, {
          attribution: TitleLayerUrl.Attribution,
        })
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
