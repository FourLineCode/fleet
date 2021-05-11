import { Container, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';

export const Content: React.FC = ({ children }) => {
	const size = useBreakpointValue({
		base: 'container.sm',
		md: 'container.lg',
	});

	return (
		<Container maxW={size} p='2' mx='auto' my='2'>
			{children}
		</Container>
	);
};
