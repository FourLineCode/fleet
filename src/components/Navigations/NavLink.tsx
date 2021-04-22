import { Box, Icon, Link, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';

interface Props {
	href: string;
	icon: IconType;
	label: string;
	newTab?: boolean;
}

export const Navlink = ({ label, icon, href, newTab = false }: Props) => {
	const hoverColor = useColorModeValue('light-muted', 'dark-muted');

	return (
		<NextLink href={href} passHref>
			<Box
				as={Link}
				target={newTab ? '_blank' : '_self'}
				w='full'
				p='4'
				cursor='pointer'
				_hover={{ bg: hoverColor, color: 'brand.500', textDecoration: 'none' }}
				rounded='lg'
				display='flex'
				alignItems='center'
			>
				<Icon as={icon} boxSize='6' mr='4' />
				<Text fontSize='lg'>{label}</Text>
			</Box>
		</NextLink>
	);
};
