import { useColorMode } from '@chakra-ui/color-mode';
import { Heading, Text, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import React from 'react';
import { Layout } from '~/components/Layouts/Layout';

const Home = () => {
	const { toggleColorMode } = useColorMode();

	return (
		<Layout title='Home' desc='Home Page'>
			<VStack>
				<Heading bgGradient='linear(to-r, green.500, red.500)' bgClip='text'>
					Home Page
				</Heading>
				<Text>Sample Text</Text>
				<Button colorScheme='brand' onClick={toggleColorMode}>
					Toggle
				</Button>
			</VStack>
		</Layout>
	);
};

export default Home;
