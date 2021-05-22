import { Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Card } from '../../ui/Card';

export const Discover = () => {
	const hide = useBreakpointValue({ base: true, md: false });
	const bgColor = useColorModeValue('light-muted', 'dark-muted');

	return (
		<Card hidden={hide} w='xs' h='100vh' bg={bgColor}>
			<Text textAlign='center' fontSize='4xl' fontWeight='bold'>
				Discover
			</Text>
		</Card>
	);
};
