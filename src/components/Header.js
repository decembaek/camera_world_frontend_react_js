import React from 'react';
import {
  HStack,
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
  Box,
  Avatar,
  Tooltip,
} from '@chakra-ui/react';
import { FaSearch, FaPaperclip } from 'react-icons/fa';
// import { FaPaperclip } from 'react-icons/fa6';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import useUser from '../lib/useUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logOut } from '../api';
import { Link } from 'react-router-dom';

const Header = () => {
  const { userLoading, user, isLoggedIn } = useUser();
  console.log(userLoading, user, isLoggedIn);
  const queryClient = useQueryClient();
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();
  const {
    isOpen: isOpenSignup,
    onOpen: onOpenSignup,
    onClose: onCloseSignup,
  } = useDisclosure();
  const mutation = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.refetchQueries(['me']);
    },
    onError: () => {
      queryClient.refetchQueries(['me']);
    },
  });

  if (!userLoading) {
    if (isLoggedIn) {
      console.log(user);
      const isEmail = user.is_email;
      const isProfile = user.is_profile;
      console.log(isEmail, isProfile);
      if (!isEmail) {
        console.log('이메일 인증 받아야 함');
      }
      if (!isProfile) {
        console.log('프로필 생성 하셈');
      }
    }
  }

  const onLogOut = () => {
    mutation.mutate();
  };

  return (
    <>
      <Box
        position={'fixed'}
        top={0}
        left={0}
        width={'100%'}
        bg={'white'}
        zIndex={1000}
        boxShadow={'md'}
      >
        <VStack>
          <HStack
            pt={2}
            pb={2}
            pr={10}
            pl={10}
            justifyContent={'space-between'}
            spacing={3}
            w={'100%'}
          >
            <HStack>
              {/* <Image
                boxSize={'50px'}
                borderRadius={'full'}
                src="original.png"
              /> */}
              {/* <Box color={'green.800'}>
                <FaPaperclip size={48} />
              </Box> */}

              <Link to={'/'}>
                <VStack spacing={0}>
                  <HStack spacing={1}>
                    <Box color={'green.800'}>
                      <FaPaperclip size={30} />
                    </Box>
                    <Text color={'green.900'} fontSize={'2xl'}>
                      Clip
                    </Text>
                  </HStack>

                  <Text color={'green.700'} fontSize={'xs'}>
                    모든 순간을 클립으로
                  </Text>
                </VStack>
              </Link>
            </HStack>
            <InputGroup
              w={{
                base: '5%',
                sm: '10%',
                md: '40%',
                lg: '50%',
              }}
              ml={5}
            >
              <InputLeftElement pointerEvents={'none'} height={'100%'}>
                <FaSearch color="gray.300" />
              </InputLeftElement>
              <Input variant={'filled'} placeholder="search" size={'lg'} />
              <InputRightElement></InputRightElement>
            </InputGroup>
            <Tooltip label="카메라 브랜드별로 감상하세요">
              <Text>브랜드관</Text>
            </Tooltip>
            {!userLoading ? (
              !isLoggedIn ? (
                <>
                  <Button variant={'none'} onClick={onOpenLogin}>
                    로그인
                  </Button>
                  <Button variant={'none'} onClick={onOpenSignup}>
                    회원가입
                  </Button>
                </>
              ) : (
                <>
                  <Tooltip label="본인의 작품을 업로드 하세요">
                    <Link to={'upload'}>
                      <Button fontWeight={'normal'} variant={'none'}>
                        클립 만들기
                      </Button>
                    </Link>
                  </Tooltip>
                  <VStack>
                    <Menu>
                      <MenuButton>
                        <Avatar
                          name={user.nickname}
                          src={user.avatar}
                          size={'md'}
                        />
                      </MenuButton>

                      <MenuList>
                        <MenuItem>나의 클립</MenuItem>
                        <MenuItem onClick={onLogOut}>로그아웃</MenuItem>
                      </MenuList>
                    </Menu>
                    {/* <Text>닉네임</Text> */}
                  </VStack>
                </>
              )
            ) : null}
          </HStack>
        </VStack>
        <LoginModal onClose={onCloseLogin} isOpen={isOpenLogin} />
        <SignupModal onClose={onCloseSignup} isOpen={isOpenSignup} />
        <Divider orientation="horizontal" w={'100%'} />
      </Box>
      <Box height={'70px'}></Box>
    </>
  );
};

export default Header;
