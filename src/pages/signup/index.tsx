import {
	Button,
	Checkbox,
	Container,
	Flex,
	Heading,
	Link,
	Text,
	useBreakpointValue,
	useColorModeValue,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Layout } from '~/components/Layouts/Layout';
import { useAuth } from '~/store/useAuth';
import { toastProps } from '~/theme/theme';
import { Input } from '~/ui/Input';
import { Textarea } from '~/ui/Textarea';

const SignUp = () => {
	const auth = useAuth();
	const toast = useToast();
	const router = useRouter();
	const [agreed, setAgreed] = useState(false);
	const padding = useBreakpointValue({ base: '8', md: '12', lg: '16' });
	const marginTop = useBreakpointValue({ base: '4', md: '12', lg: '20' });
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
								status: 'error',
								...toastProps,
							});
							return;
						}

						const { success, message } = await auth.signup(values);

						if (success) {
							toast({
								title: message,
								status: 'success',
								...toastProps,
							});
							router.push('/home');
						} else {
							toast({
								title: message,
								status: 'error',
								...toastProps,
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
							<Input
								name='email'
								type='email'
								placeholder='example@example.com ...'
								label='Email address'
							/>
							<Input
								name='username'
								type='text'
								placeholder='username ...'
								label='Username'
							/>
							<Input
								name='displayName'
								type='text'
								placeholder='your name ...'
								label='Display Name'
							/>
							<Input
								name='password'
								type='password'
								placeholder='••••••••'
								label='Password'
							/>
							<Input
								name='confirmPassword'
								type='password'
								placeholder='••••••••'
								label='Confirm Password'
							/>
							<Textarea name='bio' placeholder='about yourself ...' label='Bio' />
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
