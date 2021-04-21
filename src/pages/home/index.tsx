import { Heading, VStack } from '@chakra-ui/layout';
import React from 'react';
import { Layout } from '~/components/Layouts/Layout';

const Home = () => {
	return (
		<Layout title='Home' desc='Home Page'>
			<VStack>
				<Heading bgGradient='linear(to-r, green.500, red.500)' bgClip='text'>
					Home Page
				</Heading>
			</VStack>
		</Layout>
	);
};

export default Home;
