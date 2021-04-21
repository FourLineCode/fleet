import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { Layout } from '~/components/Layouts/Layout';

const Profile = () => {
	return (
		<Layout authorized title='Profile' desc='Profile Page'>
			<VStack>
				<Heading bgGradient='linear(to-r, green.500, red.500)' bgClip='text'>
					Profile Page
				</Heading>
			</VStack>
		</Layout>
	);
};

export default Profile;
