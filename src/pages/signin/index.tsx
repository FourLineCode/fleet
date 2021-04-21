import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { Layout } from '~/components/Layouts/Layout';

const SignIn = () => {
	return (
		<Layout title='Sign In' desc='Sign In Page'>
			<VStack>
				<Heading bgGradient='linear(to-r, green.500, red.500)' bgClip='text'>
					Sign In Page
				</Heading>
			</VStack>
		</Layout>
	);
};

export default SignIn;
