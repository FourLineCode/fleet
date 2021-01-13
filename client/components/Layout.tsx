import Head from 'next/head'
import React from 'react'
import Navbar from './Navbar'

interface Props {
	children?: React.ReactNode
	title?: string
	desc?: string
}

const Layout = ({ children, title = 'Fleet', desc = 'Fleet | New way of communications' }: Props) => (
	<div>
		<Head>
			<title>{title}</title>
			<meta charSet='utf-8' />
			<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			<meta name='description' content={desc} />
			<link
				rel='shortcut icon'
				href='https://img.icons8.com/fluent/48/000000/top-view-bird.png'
				type='image/x-icon'
			/>
		</Head>
		<Navbar />
		{children}
	</div>
)

export default Layout
