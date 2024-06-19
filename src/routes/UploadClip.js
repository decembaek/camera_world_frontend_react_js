import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Tabs 순서 저장하는 state
  const [tabIndex, setTabIndex] = useState(0);
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
  const onFile = event => {
    const clipLength = clips.length;
    const files = Array.from(event.target.files);
    const fileLength = files.length;
    if (clipLength + fileLength > 5) {
      alert('최대 5개까지 업로드 가능합니다');
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
  };
  const onSubmit = () => {};

  // 엔터키 방지 함수
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
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
        <Card w={'80%'} p={3} as={'form'} onSubmit={handleSubmit(onSubmit)}>
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
                    <Text mb={'8px'}>클립 제목</Text>
                    <Input placeholder="예시 : 제주 스트릿 사진" />
                  </Box>
                  <Box m={3}>
                    <Text mb={'8px'}>클립 테마 설명</Text>
                    <Textarea placeholder="예시 : 골목이 주는 분위기" />
                  </Box>
                  <Button onClick={onOpen}>작품 장소 추가</Button>
                  <Input variant="filled" placeholder="" />

                  <Button mt={300} type="submit">
                    클립 생성
                  </Button>
                </Box>
              </CardBody>
            </Card>
          </>
        )}

        <SearchPlace isOpen={isOpen} onClose={onClose} />

        <Box h={600}></Box>
      </VStack>
    </>
  );
};

export default UploadClip;
