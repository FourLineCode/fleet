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
	useBreakpointValue,
	VStack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useNotification } from 'src/hooks/useNotification';
import { Layout } from '~/components/Layouts/Layout';
import { useAuth } from '~/store/useAuth';

const SignIn = () => {
	const router = useRouter();
	const query = router.query;
	const auth = useAuth();
	const errorMessage = useNotification({
		message: 'Please sign in to view this page',
		type: 'error',
	});
	const signInSuccess = useNotification({
		message: 'Successfully signed in',
		type: 'success',
	});
	const padding = useBreakpointValue({ base: '8', md: '12', lg: '16' });
	const marginTop = useBreakpointValue({ base: '24', lg: '32' });

	useEffect(() => {
		if (Boolean(query.redirect)) {
			errorMessage();
		}
	}, [query]);

	return (
		<Layout title='Sign In' desc='Sign In Page'>
			<VStack>
				<Formik
					initialValues={{
						email: '',
						password: '',
					}}
					onSubmit={async (values) => {
						// TODO: validate the values
						const [success] = await auth.signin({
							email: values.email,
							password: values.password,
						});

						if (success) {
							signInSuccess();
							router.push('/home');
						}
					}}
				>
					{(props) => (
						<Container
							as={Form}
							bg='dark-muted'
							pt='8'
							px={padding}
							pb={padding}
							mt={marginTop}
							rounded='lg'
						>
							<Heading p='2' textAlign='center' as='h1' size='xl'>
								Sign In
							</Heading>
							<FormLabel htmlFor='email'>Email address</FormLabel>
							<Field
								as={Input}
								id='email'
								name='email'
								type='email'
								autoComplete='off'
								placeholder='example@example.com ...'
								focusBorderColor='brand.500'
							/>
							<FormLabel htmlFor='password'>Password</FormLabel>
							<Field
								as={Input}
								id='password'
								name='password'
								type='password'
								autoComplete='off'
								placeholder='********'
								focusBorderColor='brand.500'
							/>
							<Flex mt='2'>
								<Checkbox colorScheme='brand' mr='2' />
								<Text>Keep me signed in</Text>
							</Flex>
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
									<Text as={Link} color='brand.500' ml='2' cursor='pointer'>
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
