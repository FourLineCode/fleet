import Head from 'next/head'
import { fleetIconURL } from '../../ui/icons/FleetIcon'
import Navbar from '../Navigation/Navbar'
import Footer from './Footer'

interface Props {
	children?: React.ReactNode
	title?: string
	desc?: string
}

const Layout = ({ children, title = 'Fleet', desc = 'Fleet | New way of communication' }: Props) => (
	<div>
		<Head>
			<title>{title} | Fleet</title>
			<meta charSet='utf-8' />
			<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			<meta name='description' content={desc} />
			<link rel='shortcut icon' href={fleetIconURL} type='image/x-icon' />
		</Head>
		<Navbar />
		{children}
		<Footer />
	</div>
)

export default Layout
