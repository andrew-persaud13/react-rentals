import React, { useEffect, useCallback, useRef } from 'react';
import { useMap } from '../../providers/MapProvider';
import './TomMap.scss';

const TomMap = ({ location }) => {
  const map = useRef(null);

  const {
    initMap,
    getGeoPosition,
    setCenter,
    addMarker,
    addPopupMessage,
  } = useMap();

  const getGeoLocation = useCallback(
    location => {
      location &&
        getGeoPosition(location)
          .then(({ lat, lon }) => {
            setCenter(lon, lat, map.current);
            addMarker(map.current, lon, lat);
          })
          .catch(error => {
            addPopupMessage(map.current, error);
          });
    },
    [getGeoPosition, setCenter, addMarker, addPopupMessage]
  );

  useEffect(() => {
    getGeoLocation(location);
  }, [location, getGeoLocation]);

  useEffect(() => {
    map.current = initMap();
  }, [initMap]);
  return <div id='bwm-map'></div>;
};

export default TomMap;
