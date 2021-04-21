import Head from 'next/head';
import React from 'react';
import { Navbar } from '~/components/Navigations/Navbar';
import { config } from '~/config/config';

interface Props {
	children?: React.ReactNode;
	title?: string;
	desc?: string;
}

export const Layout = ({ title, desc, children }: Props) => {
	return (
		<main>
			<Head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				<title>{title} | Fleet</title>
				<meta name='description' content={desc} />
				<link rel='shortcut icon' href={config.iconUrl} type='image/x-icon' />
			</Head>
			<Navbar route={title || 'Fleet'} />
			{children}
		</main>
	);
};
