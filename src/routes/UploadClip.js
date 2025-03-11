import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  HStack,
  Heading,
  Input,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCloudUploadAlt, FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import InputClip from '../components/InputClip';
import { SearchPlace } from '../components/SearchPlace';

const UploadClip = () => {
  // 이 페이지에 기능은 클립을 업로드 하는것임
  // 클립이란 이미지나 비디오를 말함
  // 이미지나 비디오를 업로드 하고 그거에 대한 설명, 제목을 적고 위치가 어디인지도 지정 가능
  // 업로드 된 클립들을 보여주고 클립을 선택하면 클립을 생성하는 버튼을 누르면 클립이 생성됨
  // 클립이 생성되면 다른 페이지로 이동함
  const { register, handleSubmit } = useForm();

  // 작품 장소 추가 모달
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Tabs 순서 저장하는 state
  const [tabIndex, setTabIndex] = useState(0);

  // 위치 정보 저장하는 state
  const [location, setLocation] = useState();

  // Tabs 순서 변경하는 함수
  const handleTabsChange = index => {
    setTabIndex(index);
  };

  // 클립들을 저장하는 state
  const [clips, setClips] = useState([]);

  // 클립에서 이미지 업로드 할때 사용하는 함수
  function generateUniqueId(file) {
    const timestamp = Date.now();
    const uniqueId = `${file.name}-${timestamp}`;
    return uniqueId;
  }
  // 파일 업로드 로딩 바
  const [loading, setLoading] = useState(false);
  const onFile = event => {
    setLoading(true);
    const clipLength = clips.length;
    const files = Array.from(event.target.files);
    const fileLength = files.length;
    if (clipLength + fileLength > 5) {
      alert('최대 5개까지 업로드 가능합니다');
      setLoading(false);
      return;
    }
    const newClipsPromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            id: generateUniqueId(file),
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            file: file,
            preview: reader.result, // Add the preview URL
          });
        };
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
      });
    });
    // Wait for all promises to resolve
    Promise.all(newClipsPromises).then(newClips => {
      setClips([...clips, ...newClips]);
    });
    setLoading(false);
  };
  const onSubmit = () => {};

  // 엔터키 방지 함수
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  // 작품 장소 추가 후 콜백 함수
  const locationCallback = location => {
    console.log(location);
    setLocation(location);
    onClose();
  };

  useEffect(() => {
    // console.log(clips.length);
  }, [clips]);

  return (
    <>
      <VStack
        mt={10}
        overflowY={'auto'}
        as={'form'}
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
      >
        <Card w={'80%'} p={3}>
          <CardHeader>
            <Heading size={'md'}>클립 채우기</Heading>
          </CardHeader>
          <CardBody>
            <VStack>
              <Input
                type="file"
                id="file"
                hidden
                accept="image/*, video/mp4,video/x-m4v,video/*"
                onChange={onFile}
                multiple
              />
              <Button
                w={'200px'}
                h={'200px'}
                as={'label'}
                htmlFor="file"
                type="button"
                color={'gray.500'}
                isLoading={loading}
              >
                <FaCloudUploadAlt />
                이미지 업로드
              </Button>
              <Text>위 버튼을 눌러 파일을 업로드 하세요 (최대 5개)</Text>
              <Text>한 번에 여러 파일 업로드 가능 합니다</Text>
            </VStack>
          </CardBody>
        </Card>
        {!(clips.length === 0) && (
          <>
            <Card mt={10} w={'80%'} p={3}>
              <CardBody p={0}>
                <Box position={'relative'} w={'100%'}>
                  <Button
                    position={'absolute'}
                    left={30}
                    top={'50%'}
                    transform={'translateY(-50%)'}
                    zIndex={1}
                    variant={'unstyled'}
                    h={'100%'}
                    color={'gray.300'}
                    _hover={{ color: 'gray.500' }}
                    onClick={() => {
                      tabIndex > 0 && setTabIndex(tabIndex - 1);
                    }}
                  >
                    <FaAngleLeft fontSize={'4em'} />
                  </Button>
                  <Tabs
                    index={tabIndex}
                    onChange={handleTabsChange}
                    isFitted
                    variant={'enclosed'}
                    w={'100%'}
                    p={0}
                  >
                    <TabList>
                      {clips.map((clip, index) => (
                        <Tab key={clip.id}>{index}</Tab>
                      ))}
                    </TabList>
                    <TabPanels>
                      {clips.map((clip, index) => (
                        <TabPanel key={clip.id}>
                          <InputClip
                            key={clip.id}
                            clip={clip}
                            register={register}
                            index={index}
                          />
                        </TabPanel>
                      ))}
                    </TabPanels>
                  </Tabs>
                  <Button
                    position="absolute"
                    right={30}
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex="1"
                    variant={'unstyled'}
                    h={'100%'}
                    color={'gray.300'}
                    _hover={{ color: 'gray.500' }}
                    onClick={() => {
                      tabIndex < clips.length - 1 && setTabIndex(tabIndex + 1);
                    }}
                  >
                    <FaAngleRight fontSize={'4em'} />
                  </Button>
                </Box>
              </CardBody>
            </Card>
            <Card mt={'20px'} w={'80%'}>
              <CardBody>
                <Box>
                  <Box m={3}>
                    <Text mb={'8px'} as={'b'}>
                      클립 제목
                    </Text>
                    <Input placeholder="예시 : 제주 스트릿 사진" />
                  </Box>
                  <Box m={3}>
                    <Text mb={'8px'} as={'b'}>
                      클립 테마 설명
                    </Text>
                    <Textarea placeholder="예시 : 골목이 주는 분위기" />
                  </Box>
                  <Box m={3}>
                    <HStack>
                      <Text mb={'8px'} as={'b'}>
                        사용한 카메라
                      </Text>
                      <Text mb={'8px'} color={'red'}>
                        * 카메라 브랜드 선택 시 브랜드 관에 업로드 됩니다.
                      </Text>
                    </HStack>
                    <HStack>
                      <Select placeholder="카메라 브랜드 선택" w={'50%'}>
                        <option value="canon">Canon 캐논</option>
                        <option value="nikon">Nikon 니콘</option>
                        <option value="sony">Sony 소니</option>
                        <option value="fujifilm">Fujifilm 후지필름</option>
                        <option value="ricoh">Ricoh 리코</option>
                        <option value="panasonic">Panasonic 파나소닉</option>
                        <option value="olympus">Olympus 올림푸스</option>
                        <option value="leica">Leica 라이카</option>
                        <option value="pentax">Pentax 팬탁스</option>
                        <option value="samsung">Samsung 삼성</option>
                        <option value="hasselblad">
                          Hasselblad 핫셀블라드
                        </option>
                        <option value="phaseone">Phase One 페이즈원</option>
                        <option value="other">기타</option>
                      </Select>
                      <Input placeholder="카메라 모델명 입력" />
                    </HStack>
                  </Box>
                  <HStack>
                    <Button onClick={onOpen}>작품 장소 추가</Button>
                    <Text mb={'8px'} color={'red'}>
                      * 장소 추가 시 나만의 지도에 저장됩니다.
                    </Text>
                  </HStack>
                  {location && (
                    <>
                      <HStack p={3}>
                        <Text w={100} whiteSpace={'nowrap'}>
                          주소 :
                        </Text>
                        <Input
                          variant="filled"
                          placeholder=""
                          readOnly
                          value={location?.address_name}
                        />
                      </HStack>
                      <HStack p={3}>
                        <Text w={100} whiteSpace={'nowrap'}>
                          도로명 주소 :
                        </Text>
                        <Input
                          variant="filled"
                          placeholder=""
                          readOnly
                          value={location?.road_address_name}
                        />
                      </HStack>
                      <HStack p={3}>
                        <Text w={100} whiteSpace={'nowrap'}>
                          장소명 :
                        </Text>
                        <Input
                          variant="filled"
                          placeholder=""
                          readOnly
                          value={location?.place_name}
                        />
                      </HStack>
                      <HStack p={3}>
                        <Text w={100} whiteSpace={'nowrap'}>
                          카테고리 :
                        </Text>
                        <Input
                          variant="filled"
                          placeholder=""
                          readOnly
                          value={location?.category_name}
                        />
                      </HStack>
                      <HStack p={3}>
                        <Text w={100} whiteSpace={'nowrap'}>
                          기타 입력 :
                        </Text>
                        <Input placeholder="" />
                      </HStack>
                    </>
                  )}
                </Box>
                <HStack mt={30}>
                  <Button ml={0} type="submit" colorScheme="green">
                    클립 생성
                  </Button>
                  <Checkbox defaultChecked>댓글 허용 여부</Checkbox>
                  <Text color={'red'}>
                    * 체크 해제 시 댓글이 허용되지 않습니다
                  </Text>
                </HStack>
              </CardBody>
            </Card>
          </>
        )}

        {/* 장소 검색 모달창 */}
        <SearchPlace
          isOpen={isOpen}
          onClose={onClose}
          locationCallback={locationCallback}
        />

        <Box h={600}></Box>
      </VStack>
    </>
  );
};

export default UploadClip;
