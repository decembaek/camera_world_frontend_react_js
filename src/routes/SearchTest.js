import { Box, Button, Input } from '@chakra-ui/react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const SearchTest = () => {
  const { register, handleSubmit } = useForm();
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [position, setPosition] = useState();

  const onSubmit = ({ search }) => {
    if (!map) return;
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(search, (data, status, _pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds();
        let markers = [];

        for (let i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);
        map.setBounds(bounds);
      }
    });
  };
  const center = {
    // 지도의 중심좌표
    lat: 33.450701,
    lng: 126.570667,
  };

  return (
    <>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} w={'900px'} h={'600px'}>
        <Map
          id="map"
          center={{ lat: 33.450701, lng: 126.570667 }}
          level={3}
          style={{ width: '100%', height: '100%' }}
          onCreate={setMap}
          onClick={(_, mouseEvent) => {
            const latlng = mouseEvent.latLng;
            setPosition({
              lat: latlng.getLat(),
              lng: latlng.getLng(),
            });
          }}
        >
          {markers.map(marker => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
            >
              {info && info.content === marker.content && (
                <div style={{ color: '#000' }}>{marker.content}</div>
              )}
            </MapMarker>
          ))}
          <MapMarker position={position ?? center} />
        </Map>
        <Input {...register('search')} />
        <Button type="submit">Search</Button>
      </Box>
    </>
  );
};
