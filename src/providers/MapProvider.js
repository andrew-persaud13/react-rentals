import React, { createContext, useContext, useRef } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import axios from 'axios';

const MapContext = createContext(null);

export const MapProvider = ({ children, apiKey }) => {
  const cache = useRef({});
  const initMap = () => {
    const map = tt.map({
      key: apiKey,
      container: 'bwm-map',
      style: 'https://tomtom://vector/1/basic-main',
      zoom: 15,
      scrollZoom: false,
    });

    map.addControl(new tt.NavigationControl());
    return map;
  };

  const cacheLocation = (location, position) => {
    const nlocation = normalizeLocation(location);
    cache.current[nlocation] = position;
  };

  const normalizeLocation = location =>
    location
      .trim()
      .split(',')
      .map(loc => loc.split(' ').join(''))
      .join(',');

  const getPositionFromCache = location => {
    const nlocation = normalizeLocation(location);

    return cache.current[nlocation];
  };

  const getGeoPosition = location => {
    if (getPositionFromCache(location)) {
      return Promise.resolve(getPositionFromCache(location));
    }
    return requestGeoLocation(location);
  };

  const requestGeoLocation = location => {
    return axios
      .get(
        `https://api.tomtom.com/search/2/geocode/${location}.JSON?key=${apiKey}`
      )
      .then(response => response.data)
      .then(tomRes => {
        const { results } = tomRes;
        if (results && results.length) {
          const { position } = results[0];
          //store position in cache --> key is location, value is position
          cacheLocation(location, position);

          return position;
        }

        return rejectError();
      })
      .catch(rejectError);
  };

  const setCenter = (lon, lat, map) => map.setCenter(new tt.LngLat(lon, lat));

  const addMarker = (map, lon, lat) => {
    const markerDiv = document.createElement('div');
    markerDiv.className = 'bwm-marker';
    new tt.Marker({
      element: markerDiv,
    })
      .setLngLat([lon, lat])
      .addTo(map);
  };

  const addPopupMessage = (map, message) => {
    new tt.Popup({
      className: 'bwm-popup',
      closeButton: false,
      closeOnClick: false,
    })
      .setLngLat(new tt.LngLat(0, 0))
      .setHTML(`<p>${message}</p>`)
      .addTo(map);
  };

  const rejectError = () => Promise.reject('Location not found');

  const mapApi = {
    initMap,
    getGeoPosition,
    setCenter,
    addMarker,
    addPopupMessage,
  };

  return <MapContext.Provider value={mapApi}>{children}</MapContext.Provider>;
};

export const useMap = () => useContext(MapContext);

export default MapProvider;
