import React, { useRef } from 'react';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

const Gallery = ({ img }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <>
      <Box
        as={'button'}
        key={img.id}
        id={img.id}
        maxW={'400px'}
        maxH={'600px'}
        mx={'auto'}
        overflow={'hidden'}
        mb={4}
        position={'relative'}
        rounded={'2xl'}
        ref={btnRef}
        onClick={onOpen}
      >
        <Image
          src={img.url}
          // objectFit={'cover'}
          width={'100%'}
          height={'100%'}
        />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Clip</DrawerHeader>
          <DrawerBody>이미지 넣어야지</DrawerBody>
          <DrawerFooter>
            <Text>푸터</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Gallery;
