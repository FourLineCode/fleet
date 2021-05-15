import { Text, useBreakpointValue, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';

export const Discover = () => {
	const hide = useBreakpointValue({ base: true, md: false });
	const bgColor = useColorModeValue('light-muted', 'dark-muted');

	return (
		<VStack hidden={hide} w='xs' h='100vh' bg={bgColor} shadow='md' rounded='lg'>
			<Text textAlign='center' fontSize='4xl' fontWeight='bold'>
				Discover
			</Text>
		</VStack>
	);
};
