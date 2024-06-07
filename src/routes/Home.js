import { Center } from '@chakra-ui/react';
import React from 'react';
import Masonry from 'react-masonry-css';
import '../styles/style.css';
import Gallery from '../components/Gallery';

const Home = () => {
  const images = [
    { id: 1, url: 'Apple Pay.jpeg', size: 'square' },
    { id: 2, url: 'penguin.jpg', size: 'vertical' },
    { id: 3, url: 'car2.jpeg', size: 'horizontal' },
    { id: 4, url: 'car3.jpeg', size: 'square' },
    { id: 5, url: 'car4.jpeg', size: 'horizontal' },
    { id: 6, url: 'penguin.jpg', size: 'vertical' },
    { id: 7, url: 'car.jpeg', size: 'square' },
    { id: 8, url: 'car2.jpeg', size: 'horizontal' },
    { id: 9, url: 'car3.jpeg', size: 'vertical' },
    { id: 10, url: 'car4.jpeg', size: 'horizontal' },
    { id: 11, url: 'car.jpeg', size: 'square' },
    { id: 12, url: 'car2.jpeg', size: 'horizontal' },
    { id: 13, url: 'car3.jpeg', size: 'vertical' },
    { id: 14, url: 'car4.jpeg', size: 'square' },
    { id: 15, url: 'Apple Pay.jpeg', size: 'horizontal' },
    { id: 16, url: 'penguin.jpg', size: 'vertical' },
    { id: 17, url: 'car2.jpeg', size: 'horizontal' },
    { id: 18, url: 'car3.jpeg', size: 'square' },
    { id: 19, url: 'car4.jpeg', size: 'vertical' },
    { id: 20, url: 'penguin.jpg', size: 'horizontal' },
  ];

  const breakpointColumnsObj = {
    default: 6,
    1300: 5,
    1100: 4,
    700: 3,
    500: 2,
  };

  return (
    <>
      <Center overflowY={'auto'} p={10}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {images.map(img => (
            <Gallery key={img.id} img={img} />
          ))}
        </Masonry>
      </Center>
    </>
  );
};

export default Home;
