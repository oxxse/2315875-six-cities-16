import leaflet, { LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect, memo } from 'react';
import './map.module.css';
import { Location, PlaceCard } from '../../types/types';
import { MapIcon } from '../../const';
import useMap from '../../hooks/use-map';

type Map = {
  className: string;
  city: Location;
  offers?: PlaceCard[];
  activeOffer?: PlaceCard | null;
}

const defaultCustomIcon = leaflet.icon(MapIcon.Default);

const currentCustomIcon = leaflet.icon(MapIcon.Active);

const Map = memo(({ className, city, offers, activeOffer }: Map): JSX.Element => {
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

  // useEffect(() => {
  // //   if (map && offers) {
  //     offers.forEach((offer) => {
  //       if (offer.location) {
  //         leaflet.
  //           marker({
  //             lat: offer.location.latitude,
  //             lng: offer.location.longitude,
  //           }, {
  //             icon: activeOffer && activeOffer.id === offer.id ? currentCustomIcon : defaultCustomIcon,
  //           }).addTo(markerLayer.current);
  //       }
  //     });
  //   }
  // }, [activeOffer, map, offers]);

  useEffect(() => {
    if (map && offers) {
      markerLayer.current.clearLayers();
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: offer.id === activeOffer?.id ? currentCustomIcon : defaultCustomIcon,
          })
          .addTo(markerLayer.current);
      });
    }
  }, [activeOffer, map, offers]);

  return (
    <section
      className={`${className}__map map`}
      ref={mapRef}
    >
    </section>
  );
});

Map.displayName = 'Map';

export default Map;
