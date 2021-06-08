import { Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { FaFrown } from 'react-icons/fa';

export const FleetNotFound = () => {
	return (
		<VStack flex='1' justify='center'>
			<Icon as={FaFrown} boxSize='24' color='text-muted' />
			<Text fontSize='4xl' fontWeight='extrabold' color='text-muted'>
				Fleet not found
			</Text>
		</VStack>
	);
};
