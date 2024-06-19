import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const SearchPlace = ({ isOpen, onClose }) => {
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

  const [clickedLocationInfo, setClickedLocationInfo] = useState();

  const handleMapClick = (_, mouseEvent) => {
    const latlng = mouseEvent.latLng;
    setPosition({
      lat: latlng.getLat(),
      lng: latlng.getLng(),
    });

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(
      latlng.getLng(),
      latlng.getLat(),
      (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setClickedLocationInfo(result[0].address.address_name);
        }
      }
    );
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'6xl'}>
        <ModalOverlay />
        <ModalContent maxW={'1200px'} maxH={'1200px'}>
          <Box
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            w={'100%'}
            h={'600px'}
            p={5}
          >
            {clickedLocationInfo && (
              <Box
                position="absolute"
                top={7}
                left={7}
                bg="white"
                p={4}
                borderRadius="md"
                boxShadow="md"
                zIndex={30}
              >
                <Text>클릭한 위치: {clickedLocationInfo}</Text>
              </Box>
            )}
            <Map
              id="map"
              center={{ lat: 33.450701, lng: 126.570667 }}
              level={3}
              style={{ width: '100%', height: '100%' }}
              onCreate={setMap}
              onClick={handleMapClick}
            >
              {markers.map(marker => (
                <MapMarker
                  key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                  position={marker.position}
                  onClick={() => setInfo(marker)}
                >
                  {info && info.content === marker.content && (
                    // <div style={{ color: '#000' }}>{marker.content}</div>
                    <Box>
                      <Text>{marker.content}</Text>
                    </Box>
                  )}
                </MapMarker>
              ))}
              <MapMarker position={position ?? center} />
            </Map>
          </Box>
          <Text pl={5} fontSize={'xl'}>
            위치 검색
          </Text>
          <Center mt={0} w={'100%'} pr={5} pl={5} pt={2} pb={5}>
            <HStack w={'100%'}>
              <Input {...register('search')} />
              <Button type="button" onClick={handleSubmit(onSubmit)}>
                Search
              </Button>
            </HStack>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};
