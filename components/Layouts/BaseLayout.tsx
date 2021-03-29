import Head from 'next/head';
import React from 'react';
import { Notification } from '../../ui/components/Notification';
import { fleetIconURL } from '../../ui/icons/FleetIcon';
import { Navbar } from '../Navigation/Navbar';
import { Footer } from './Footer';
import TopProgressBar from './TopProgressBar';

interface Props {
	children?: React.ReactNode;
	title?: string;
	desc?: string;
}

export const BaseLayout = ({ children, title = 'Fleet', desc = 'Fleet | New way of communication' }: Props) => (
	<main>
		<Head>
			<title>{title} | Fleet</title>
			<meta charSet='utf-8' />
			<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			<meta name='description' content={desc} />
			<link rel='shortcut icon' href={fleetIconURL} type='image/x-icon' />
		</Head>
		<TopProgressBar />
		<Navbar />
		{children}
		<Footer />
		<Notification />
	</main>
);
