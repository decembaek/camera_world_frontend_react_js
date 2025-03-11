import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  HStack,
  Heading,
  Input,
  Link,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const SearchPlace = ({ isOpen, onClose, locationCallback }) => {
  const { register, handleSubmit } = useForm();
  // const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [position, setPosition] = useState();
  // const [clickedMarkerInfo, setClickedMarkerInfo] = useState(null);
  const [clickedLocationInfo, setClickedLocationInfo] = useState();

  // 주소 - 좌표 변환 객체 생성
  const geocoder = new window.kakao.maps.services.Geocoder();

  // 검색 결과
  const [searchResults, setSearchResults] = useState([]);

  // 지도 클리 결과
  const [clickResult, setClickResult] = useState();

  // 좌표로 주소 변환
  // const searchLocationFromCoords = (coords, callback) => {}
  // const searchDetailAddrFromCoords = (coords, callback) => {
  //   geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  // };

  // 검색 기능
  const onEnterSearch = event => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };
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
        setSearchResults(data);
      }
    });
  };

  const center = {
    // 지도의 중심좌표
    lat: 33.450701,
    lng: 126.570667,
  };

  // 지도 화면 클릭 하면 마커 생기고 장소 나옴
  const handleMapClick = (_, mouseEvent) => {
    const latlng = mouseEvent.latLng;
    setPosition({
      lat: latlng.getLat(),
      lng: latlng.getLng(),
    });

    geocoder.coord2Address(
      latlng.getLng(),
      latlng.getLat(),
      (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setClickResult(result[0]);
          setClickedLocationInfo(result[0].address.address_name);
          onSubmit({ search: result[0].address.address_name });
        }
      }
    );
  };

  // 지도 화면 클릭 후 위치 선택
  const mapClickAndLocationSelect = () => {
    if (clickResult) {
      const address_name = clickResult.address.address_name;
      const road_address_name = clickResult.road_address.address_name;
      const place_name = clickResult.road_address.building_name;
      const category_name = '';
      const addressDice = {
        address_name,
        road_address_name,
        place_name,
        category_name,
      };
      locationCallback(addressDice);
    }
  };

  // 마커 클릭 이벤트
  const handleMarkerClick = marker => {
    if (marker) {
      const positionClick = marker.position;
      setPosition({
        lat: positionClick.lat,
        lng: positionClick.lng,
      });

      geocoder.coord2Address(
        positionClick.lng,
        positionClick.lat,
        (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            setClickResult(result[0]);
            setClickedLocationInfo(result[0].address.address_name);
            onSubmit({
              search: result[0].address.address_name,
            });
            // setInfo(result[0].address.address_name);
            // setClickedMarkerInfo(marker);
          }
        }
      );
      // console.log(marker);
      // setInfo(marker);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'6xl'}>
        <ModalOverlay />
        <ModalContent maxW={'1200px'} maxH={'1300px'}>
          <ModalCloseButton />
          <Box w={'100%'} h={'800px'} p={5} mt={5}>
            {clickedLocationInfo && (
              <Box
                position="absolute"
                top={16}
                left={7}
                bg="white"
                p={4}
                borderRadius="md"
                boxShadow="md"
                zIndex={30}
              >
                <HStack>
                  <Text>선택 위치: </Text>
                  <Text as={'b'}>{clickedLocationInfo}</Text>
                  <Button
                    colorScheme="green"
                    onClick={mapClickAndLocationSelect}
                  >
                    선택 위치로 지역 등록하기
                  </Button>
                </HStack>
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
                  onClick={() => {
                    handleMarkerClick(marker);
                  }}
                >
                  {/* {info && (
                        // <div style={{ color: '#000' }}>{marker.content}</div>
                        <>
                          <Text>{info}</Text>
                          <Text>{marker.content}</Text>
                        </>
                      )} */}
                </MapMarker>
              ))}
              <MapMarker position={position ?? center} />
            </Map>
          </Box>

          <Text as={'b'} pl={5} fontSize={'xl'}>
            위치 검색
          </Text>
          <Center mt={0} w={'100%'} pr={5} pl={5} pt={2} pb={5}>
            <HStack w={'100%'}>
              <Input {...register('search')} onKeyDown={onEnterSearch} />
              <Button
                type="button"
                onClick={handleSubmit(onSubmit)}
                onKeyDown={onEnterSearch}
                w={'40%'}
              >
                위치 검색
              </Button>
            </HStack>
          </Center>
          <Card overflowY={'auto'} maxH={'500px'}>
            <CardHeader>
              <Heading size={'md'}>위치 목록</Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing={4}>
                {searchResults &&
                  searchResults.map((result, index) => (
                    <Box key={index}>
                      <Box
                        as="button"
                        variant="outline"
                        w="100%"
                        textAlign="left"
                        borderWidth="1px"
                        borderRadius="md"
                        p={3}
                        _hover={{ bg: 'gray.100' }}
                        onClick={() => {
                          onSubmit({
                            search: result.address_name + result.place_name,
                          });
                          setClickedLocationInfo(result.address_name);
                        }}
                      >
                        <Heading size={'x'}>{result.address_name}</Heading>
                        <Text pt={2} fontSize={'sm'}>
                          {result.category_group_name}
                        </Text>
                        <Text pt={2} fontSize={'sm'}>
                          {result.place_name}
                        </Text>
                      </Box>

                      <HStack>
                        <Button
                          mt={2}
                          colorScheme="green"
                          onClick={() => locationCallback(result)}
                        >
                          지역 등록
                        </Button>
                        <Link
                          mt={2}
                          href={result.place_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          네비게이션
                        </Link>
                      </HStack>
                    </Box>
                  ))}
              </Stack>
            </CardBody>
          </Card>
          <ModalFooter>
            <Button colorScheme="red" onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
