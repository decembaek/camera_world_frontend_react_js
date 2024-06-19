import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
// import { MapCard } from '../components/MapCard';

const Upload = () => {
  return (
    <>
      <Center mt={10}>
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
              />
              <Button
                w={'200px'}
                h={'200px'}
                as={'label'}
                htmlFor="file"
                type="button"
              >
                <FaCloudUploadAlt />
                이미지 업로드
              </Button>
              <Text>버튼을 눌러 파일을 업로드 하세요</Text>
            </VStack>
          </CardBody>
        </Card>
      </Center>
    </>
  );
};

export default Upload;
