import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useAuthorization from '../hooks/useAuthorization'
import { refreshAuthToken } from '../store/actions/authActions'
import Layout from './Layout'

interface Props {
	children?: React.ReactNode
	title?: string
	desc?: string
}

const ProtectedLayout = ({ children, title, desc }: Props) => {
	const auth = useAuthorization()
	const router = useRouter()
	const dispatch = useDispatch()

	useEffect(() => {
		if (!auth.signedIn) {
			dispatch(refreshAuthToken())
		}
	}, [])

	if (!auth.signedIn && !auth.refreshing && process.browser) {
		router.push('/signin')
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
