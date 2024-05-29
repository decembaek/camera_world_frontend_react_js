import React from 'react';
import {
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
  Divider,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  useDisclosure,
} from '@chakra-ui/react';
import { FaSearch, FaList } from 'react-icons/fa';
import LoginModal from './LoginModal';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <VStack>
        <HStack p={4} justifyContent={'space-between'} spacing={3} w={'100%'}>
          <HStack>
            <Image boxSize={'50px'} borderRadius={'full'} src="original.png" />
          </HStack>
          <Text>SITENAME</Text>
          <InputGroup
            w={{
              base: '10%',
              sm: '20%',
              md: '30%',
              lg: '40%',
            }}
            ml={5}
          >
            <InputLeftElement pointerEvents={'none'} height={'100%'}>
              <FaSearch color="gray.300" />
            </InputLeftElement>
            <Input variant={'filled'} placeholder="search" size={'lg'} />
            <InputRightElement></InputRightElement>
          </InputGroup>
          <Text>카메라 찾기</Text>
          <Text>브랜드관</Text>
          <Button variant={'none'} onClick={onOpen}>
            로그인
          </Button>
          <Menu>
            <MenuButton as={Button} rightIcon={<FaList />}>
              메뉴
            </MenuButton>
            <MenuList>
              <MenuItem>Login</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </VStack>
      <LoginModal onClose={onClose} isOpen={isOpen} />
      <Divider orientation="horizontal" w={'100%'} />
    </>
  );
};

export default Header;
