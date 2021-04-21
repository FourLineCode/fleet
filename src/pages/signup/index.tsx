import {
	Button,
	Checkbox,
	Container,
	Flex,
	FormLabel,
	Heading,
	Input,
	Link,
	Text,
	Textarea,
	useBreakpointValue,
	useColorModeValue,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Layout } from '~/components/Layouts/Layout';
import { useAuth } from '~/store/useAuth';

const SignUp = () => {
	const auth = useAuth();
	const toast = useToast();
	const router = useRouter();
	const [agreed, setAgreed] = useState(false);
	const padding = useBreakpointValue({ base: '8', md: '12', lg: '16' });
	const marginTop = useBreakpointValue({ base: '12', lg: '20' });
	const bg = useColorModeValue('light-muted', 'dark-muted');

	return (
		<Layout title='Sign Up' desc='Sign Up Page'>
			<VStack>
				<Formik
					initialValues={{
						email: '',
						username: '',
						displayName: '',
						password: '',
						confirmPassword: '',
						bio: '',
					}}
					onSubmit={async (values) => {
						if (values.password !== values.confirmPassword) {
							toast({
								title: 'Passwords do not match',
								position: 'bottom',
								status: 'error',
								duration: 5000,
							});
							return;
						}

						const { success, message } = await auth.signup(values);

						if (success) {
							toast({
								title: message,
								position: 'bottom',
								status: 'success',
								duration: 5000,
							});
							router.push('/home');
						} else {
							toast({
								title: message,
								position: 'bottom',
								status: 'error',
								duration: 5000,
							});
						}
					}}
				>
					{(props) => (
						<Container
							as={Form}
							bg={bg}
							pt='8'
							px={padding}
							pb={padding}
							mt={marginTop}
							rounded='lg'
							shadow='lg'
						>
							<Heading p='2' textAlign='center' as='h1' size='xl'>
								Sign Up
							</Heading>
							<FormLabel htmlFor='email'>Email address</FormLabel>
							<Field
								as={Input}
								id='email'
								name='email'
								autoComplete='off'
								type='email'
								placeholder='example@example.com ...'
								focusBorderColor='brand.500'
								variant='filled'
							/>
							<FormLabel htmlFor='username'>Username</FormLabel>
							<Field
								as={Input}
								id='username'
								name='username'
								autoComplete='off'
								type='text'
								placeholder='username ...'
								focusBorderColor='brand.500'
								variant='filled'
							/>
							<FormLabel htmlFor='displayName'>Display Name</FormLabel>
							<Field
								as={Input}
								id='displayName'
								name='displayName'
								autoComplete='off'
								type='text'
								placeholder='your name ...'
								focusBorderColor='brand.500'
								variant='filled'
							/>
							<FormLabel htmlFor='password'>Password</FormLabel>
							<Field
								as={Input}
								id='password'
								name='password'
								autoComplete='off'
								type='password'
								placeholder='********'
								focusBorderColor='brand.500'
								variant='filled'
							/>
							<FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
							<Field
								as={Input}
								id='confirmPassword'
								name='confirmPassword'
								autoComplete='off'
								type='password'
								placeholder='********'
								focusBorderColor='brand.500'
								variant='filled'
							/>
							<FormLabel htmlFor='bio' display='flex'>
								Bio
								<Text color='text-muted' ml='1'>
									(optional)
								</Text>
							</FormLabel>
							<Field
								as={Textarea}
								id='bio'
								name='bio'
								autoComplete='off'
								placeholder='about yourself ...'
								focusBorderColor='brand.500'
								variant='filled'
								resize='none'
							/>
							<Flex mt='2'>
								<Checkbox
									checked={agreed}
									onInput={() => setAgreed((p) => !p)}
									colorScheme='brand'
									borderColor='gray.500'
									mr='2'
								/>
								<Text>
									{/* TODO: Open a modal for this */}
									Accept our{' '}
									<Link fontWeight='semibold' color='brand.500'>
										Terms and Conditions
									</Link>
								</Text>
							</Flex>
							<Button
								mt='2'
								colorScheme='brand'
								type='submit'
								isFullWidth
								isLoading={props.isSubmitting}
								disabled={!agreed || props.isSubmitting}
							>
								Sign Up
							</Button>
							<Flex justify='center' mt='2'>
								<Text>Already have an account?</Text>
								<NextLink passHref href='/signin'>
									<Text
										fontWeight='semibold'
										as={Link}
										color='brand.500'
										ml='2'
										cursor='pointer'
									>
										Sign in
									</Text>
								</NextLink>
							</Flex>
						</Container>
					)}
				</Formik>
			</VStack>
		</Layout>
	);
};

export default SignUp;
