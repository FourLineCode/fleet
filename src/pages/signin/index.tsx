import {
	Button,
	Container,
	Flex,
	Heading,
	Link,
	Spinner,
	Text,
	useBoolean,
	useBreakpointValue,
	useColorModeValue,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Layout } from '~/components/layouts/Layout';
import { useAuth } from '~/store/useAuth';
import { toastProps } from '~/theme/theme';
import { CheckboxPrompt } from '~/ui/CheckboxPrompt';
import { Input } from '~/ui/Input';

const SignIn = () => {
	const router = useRouter();
	const query = router.query;
	const auth = useAuth();
	const toast = useToast();
	const [redirecting, setRedirecting] = useBoolean();
	const padding = useBreakpointValue({ base: '8', md: '12', lg: '16' });
	const marginTop = useBreakpointValue({ base: '24', lg: '32' });
	const bg = useColorModeValue('light-muted', 'dark-muted');
	const spinnerSize = useBreakpointValue({ sm: 'lg', md: 'xl' });

	useEffect(() => {
		if (Boolean(query.redirect)) {
			toast({
				title: 'Please sign in to view this page',
				status: 'error',
				...toastProps,
			});
		}
	}, [query]);

	useEffect(() => {
		return () => {
			setRedirecting.off();
		};
	}, []);

	if (redirecting) {
		return (
			<Layout title='Sign In' desc='Sign In Page'>
				<Flex as='div' w='100vw' h='100vh' alignItems='center' justify='center'>
					<Spinner size={spinnerSize} color='brand.500' thickness='3px' />
				</Flex>
			</Layout>
		);
	}

	return (
		<Layout title='Sign In' desc='Sign In Page'>
			<VStack>
				<Formik
					initialValues={{
						email: '',
						password: '',
						keep: true,
					}}
					onSubmit={async (values) => {
						const { success, message } = await auth.signin(values);

						if (success) {
							setRedirecting.on();
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
								Sign In
							</Heading>
							<Input
								name='email'
								type='email'
								placeholder='example@example.com ...'
								label='Email address'
							/>
							<Input
								name='password'
								type='password'
								placeholder='••••••••'
								label='Password'
							/>
							<CheckboxPrompt
								name='keep'
								defaultChecked={true}
								label='Keep me signed in'
							/>
							<Button
								mt='2'
								colorScheme='brand'
								type='submit'
								isFullWidth
								isLoading={props.isSubmitting}
							>
								Sign In
							</Button>
							<Flex justify='center' mt='2'>
								<Text>Don't have an account?</Text>
								<NextLink passHref href='/signup'>
									<Text
										fontWeight='semibold'
										as={Link}
										color='brand.500'
										ml='2'
										cursor='pointer'
									>
										Sign up
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

export default SignIn;
