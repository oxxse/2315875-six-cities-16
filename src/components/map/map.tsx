import leaflet, { LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import { Offer, Location } from '../../types/types';
import { UrlMarkers } from '../../const';
import useMap from '../../hooks/use-map';

type Map = {
  className: string;
  city: Location;
  offers?: Offer[];
  activeOffer?: Offer | null;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: UrlMarkers.UrlMarkerDefault,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: UrlMarkers.UrlMarkerCurrent,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

function Map({className, city, offers, activeOffer}: Map): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap({ mapRef, city });
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if (map) {
      map.setView([city.latitude, city.longitude], city.zoom);
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  }, [city, map]);

  useEffect(() => {
    if (map && offers) {
      offers.forEach((offer) => {
        if (offer.location) {
          leaflet.
            marker({
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            }, {
              icon: activeOffer && activeOffer.id === offer.id ? currentCustomIcon : defaultCustomIcon,
            }).addTo(markerLayer.current);
        }
      });
    }
  }, [ activeOffer, map, offers ]);

  return(
    <section
      className={`${className}__map map`}
      style={{height: '500px'}}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
