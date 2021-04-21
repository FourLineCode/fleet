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
	VStack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { Layout } from '~/components/Layouts/Layout';

const SignUp = () => {
	const [agreed, setAgreed] = useState(false);
	const padding = useBreakpointValue({ base: '8', md: '12', lg: '16' });
	const marginTop = useBreakpointValue({ base: '12', lg: '20' });

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
					}}
					onSubmit={(values, actions) => {
						setTimeout(() => {
							console.log(values);
							actions.setSubmitting(false);
						}, 2000);
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
								resize='none'
							/>
							<Flex mt='2'>
								<Checkbox
									checked={agreed}
									onInput={() => setAgreed((p) => !p)}
									colorScheme='brand'
									mr='2'
								/>
								<Text>
									{/* TODO: Open a modal for this */}
									Accept our <Link color='brand.500'>Terms and Conditions</Link>
								</Text>
							</Flex>
							<Button
								mt='2'
								colorScheme='brand'
								type='submit'
								isFullWidth
								isLoading={props.isSubmitting}
								disabled={!agreed}
							>
								Sign Up
							</Button>
							<Flex justify='center' mt='2'>
								<Text>Already have an account?</Text>
								<NextLink passHref href='/signin'>
									<Text as={Link} color='brand.500' ml='2' cursor='pointer'>
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
