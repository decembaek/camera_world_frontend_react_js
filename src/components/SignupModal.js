import React from 'react';

import {
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  Divider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Heading,
  Center,
  ModalBody,
  ModalCloseButton,
  Box,
  AbsoluteCenter,
  HStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { FaAt, FaLock } from 'react-icons/fa';
import { emailLogin } from '../api';

const SignupModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const mutation = useMutation({
    mutationFn: emailLogin,
    onSuccess: ({ ok }) => {
      console.log(ok);
      console.log('ok');
    },
    onError: () => {
      console.log('error');
    },
  });
  const onSubmit = ({ email, password }) => {
    console.log(email, password);
    mutation.mutate({ email, password });
    reset();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      {/* <ModalContent backgroundImage={'original.png'} backgroundSize={'cover'}> */}
      <ModalContent>
        <ModalCloseButton />
        <Center mt={10}>
          <Image boxSize={'70px'} borderRadius={'full'} src="original.png" />
        </Center>
        <ModalHeader mt={5}>
          <VStack>
            <Heading mb={4} size={'lg'} color={'gray.500'}>
              사이트 방문을 환영합니다
            </Heading>
            <Text>회원가입 해주세요</Text>
          </VStack>
        </ModalHeader>
        <ModalBody as={'form'} p={10} onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup mb={2} w={'80%'}>
              <InputLeftElement pointerEvents={'none'}>
                <FaAt color="gray.400" />
              </InputLeftElement>
              <Input
                isInvalid={Boolean(errors.email?.message)}
                type="email"
                placeholder="이메일 입력"
                size={'md'}
                {...register('email', { required: '이메일을 입력해주세요' })}
              />
            </InputGroup>
            <InputGroup mb={2} w={'80%'}>
              <InputLeftElement pointerEvents={'none'}>
                <FaLock color="gray.400" />
              </InputLeftElement>
              <Input
                isInvalid={Boolean(errors.password?.message)}
                type="password"
                placeholder="패스워드 입력"
                size={'md'}
                {...register('password', {
                  required: '패스워드를 입력해주세요',
                })}
              />
            </InputGroup>
            <Button colorScheme="green" w={'80%'} type="submit">
              회원가입
            </Button>
            <Button colorScheme="gray" w={'80%'}>
              계정찾기
            </Button>
          </VStack>
          <Box position={'relative'} p={5} mt={1} mb={1}>
            <Divider />
            <AbsoluteCenter bg={'white'} px={4}>
              소셜 계정 로그인
            </AbsoluteCenter>
          </Box>
          <HStack justifyContent={'center'} spacing={10}>
            <Box w={'10%'} rounded={'md'} bg={'white'} boxShadow={'2xl'}>
              <Button variant={'unstyled'} p={0} w={'100%'}>
                <Image src="google.png" w={'100%'} />
              </Button>
            </Box>
            <Box w={'10%'} rounded={'md'} bg={'white'} boxShadow={'2xl'}>
              <Button variant={'unstyled'} p={0} w={'100%'}>
                <Image src="kakao.png" w={'100%'} />
              </Button>
            </Box>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SignupModal;
