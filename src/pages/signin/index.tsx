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
	useToast,
	VStack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Layout } from '~/components/Layouts/Layout';
import { useAuth } from '~/store/useAuth';

const SignIn = () => {
	const router = useRouter();
	const query = router.query;
	const auth = useAuth();
	const toast = useToast();
	const padding = useBreakpointValue({ base: '8', md: '12', lg: '16' });
	const marginTop = useBreakpointValue({ base: '24', lg: '32' });

	useEffect(() => {
		if (Boolean(query.redirect)) {
			toast({
				title: 'Please sign in to view this page',
				position: 'bottom',
				status: 'error',
				duration: 5000,
			});
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
						const [success, message] = await auth.signin(values);

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
								<Checkbox defaultChecked={true} colorScheme='brand' mr='2' />
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
