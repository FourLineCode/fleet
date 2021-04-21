import { Box, Flex } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Navbar } from '~/components/Navigations/Navbar';
import { config } from '~/config/config';
import { useAuth } from '~/store/useAuth';

interface Props {
	authorized?: boolean;
	title?: string;
	desc?: string;
	children?: React.ReactNode;
}

export const Layout = ({ title, desc, children, authorized = false }: Props) => {
	const router = useRouter();
	const auth = useAuth();
	const spinnerSize = useBreakpointValue({ sm: 'lg', md: 'xl' });

	useEffect(() => {
		if (process.browser && authorized && !auth.authorized) {
			router.push('/signin?redirect=true');
		}
	}, []);

	if (!auth.authorized && authorized) {
		return (
			<main>
				<Head>
					<meta charSet='utf-8' />
					<meta name='viewport' content='initial-scale=1.0, width=device-width' />
					<title>{title} | Fleet</title>
					<meta name='description' content={desc} />
					<link rel='shortcut icon' href={config.iconUrl} type='image/x-icon' />
				</Head>
				<Flex as='div' w='100vw' h='100vh' alignItems='center' justify='center'>
					<Spinner size={spinnerSize} color='brand.500' thickness='3px' />
				</Flex>
			</main>
		);
	}

	return (
		<Box as='main' minH='100vh'>
			<Head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				<title>{title} | Fleet</title>
				<meta name='description' content={desc} />
				<link rel='shortcut icon' href={config.iconUrl} type='image/x-icon' />
			</Head>
			<Navbar route={title || 'Fleet'} />
			{children}
		</Box>
	);
};
