import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { Layout } from '~components/layouts/Layout';

const Settings = () => {
	return (
		<Layout authorized title='Settings' desc='Settings Page'>
			<VStack>
				<Heading bgGradient='linear(to-r, green.500, red.500)' bgClip='text'>
					Settings Page
				</Heading>
			</VStack>
		</Layout>
	);
};

export default Settings;
