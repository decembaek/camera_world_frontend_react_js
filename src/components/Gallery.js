import React from 'react';
import { Box, Image } from '@chakra-ui/react';

const Gallery = ({ img }) => {
  return (
    <Box
      key={img.id}
      id={img.id}
      maxW={'350px'}
      maxH={'350px'}
      mx={'auto'}
      overflow={'hidden'}
      mb={4}
      position={'relative'}
      rounded={'2xl'}
    >
      <Image
        src={img.url}
        // objectFit={'cover'}
        width={'100%'}
        height={'100%'}
      />
    </Box>
  );
};

export default Gallery;
