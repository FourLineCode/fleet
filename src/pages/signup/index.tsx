import { Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Layout } from '~/components/Layouts/Layout';

const SignUp = () => {
	return (
		<Layout title='Sign Up' desc='Sign Up Page'>
			<VStack>
				<Heading bgGradient='linear(to-r, green.500, red.500)' bgClip='text'>
					Sign Up Page
				</Heading>
				<Text>Sample Text</Text>
			</VStack>
		</Layout>
	);
};

export default SignUp;
