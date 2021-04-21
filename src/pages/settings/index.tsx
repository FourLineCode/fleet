import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { Layout } from '~/components/Layouts/Layout';

const Settings = () => {
	return (
		<Layout title='Settings' desc='Settings Page'>
			<VStack>
				<Heading bgGradient='linear(to-r, green.500, red.500)' bgClip='text'>
					Settings Page
				</Heading>
			</VStack>
		</Layout>
	);
};

export default Settings;
