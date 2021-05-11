import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, BoxProps } from '@chakra-ui/layout';
import React from 'react';

export const Card: React.FC<BoxProps> = ({ children, ...props }) => {
	const bg = useColorModeValue('light-muted', 'dark-muted');

	return (
		<Box p='4' rounded='lg' shadow='md' bg={bg} {...props}>
			{children}
		</Box>
	);
};
