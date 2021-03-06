import { useRouter } from 'next/router'
import React from 'react'
import useAuthorization from '../../hooks/useAuthorization'
import Layout from './Layout'

interface Props {
	children?: React.ReactNode
	title?: string
	desc?: string
}

const ProtectedLayout = ({ children, title, desc }: Props) => {
	const auth = useAuthorization()
	const router = useRouter()

	if (!auth.signedIn && auth.refreshing === 'done' && process.browser) {
		router.push('/signin?redirect=true')
	}

	return (
		<>
			{auth.signedIn && (
				<Layout title={title} desc={desc}>
					{children}
				</Layout>
			)}
		</>
	)
}

export default ProtectedLayout
