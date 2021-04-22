import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { Layout } from '~/components/layouts/Layout';

const Messages = () => {
	return (
		<Layout authorized title='Messages' desc='Messages Page'>
			<VStack>
				<Heading bgGradient='linear(to-r, green.500, red.500)' bgClip='text'>
					Messages Page
				</Heading>
			</VStack>
		</Layout>
	);
};

export default Messages;
