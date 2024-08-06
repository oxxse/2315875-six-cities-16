import leaflet from 'leaflet';
import { useEffect, useState, useRef, RefObject } from 'react';
import { Location } from '../types/types';
import { TileLayers } from '../const';

type UseMapProps = {
  mapRef: RefObject<HTMLDivElement>;
  city: Location;
}

function useMap({mapRef, city}: UseMapProps) {
  const [ map, setMap ] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.latitude,
          lng: city.longitude
        },
        zoom: city.zoom,
      });

      leaflet
        .tileLayer(
          TileLayers.TileLayerUrlPattern,
          {
            attribution: TileLayers.TileLayerAttribution,
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
