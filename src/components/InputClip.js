import {
  Box,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import React from 'react';

const InputClip = ({ clip, register, index }) => {
  return (
    <>
      <Box
        mt={5}
        key={clip.id}
        w={'100%'}
        h={'700px'}
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        bg="gray.200"
      >
        {clip.type.startsWith('image/') && (
          <Image
            src={clip.preview}
            alt={clip.name}
            objectFit="scale-down"
            w={'100%'}
            h={'100%'}
          />
        )}
        {clip.type.startsWith('video/') && (
          <Box as="video" controls objectFit="scale-down" w={'100%'} h={'100%'}>
            <source src={clip.preview} type={clip.type} />
            브라우저가 비디오를 지원하지 않습니다. 크롬을 사용해주세요
          </Box>
        )}
      </Box>
      <InputGroup mt={10}>
        <InputLeftAddon>이미지 설명</InputLeftAddon>
        <Input placeholder="예시 : 자전거를 보는 나 " />
      </InputGroup>
    </>
  );
};

export default InputClip;
