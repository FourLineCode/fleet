import { Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const SignIn = () => {
	return (
		<VStack>
			<Heading bgGradient='linear(to-r, green.500, red.500)' bgClip='text'>
				Sign In Page
			</Heading>
			<Text>Sample Text</Text>
		</VStack>
	);
};

export default SignIn;
