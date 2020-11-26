import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import useAuthorization from '../hooks/useAuthorization'
import { refreshAuthToken } from '../store/actions/authActions'

type Props = {
	path: string
	children: React.ReactNode
}

const ProtectedRoute = ({ path, children }: Props) => {
	const auth = useAuthorization()
	const dispatch = useDispatch()

	useEffect(() => {
		if (!auth.signedIn) {
			dispatch(refreshAuthToken())
		}
	}, [])

	return (
		<>
			{auth.signedIn ? (
				<Route path={path}>{children}</Route>
			) : (
				!auth.refreshing && <Redirect to='/signin' />
			)}
		</>
	)
}

export default ProtectedRoute
