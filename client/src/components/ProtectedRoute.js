import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import useAuthorization from '../hooks/useAuthorization'

const ProtectedRoute = ({ path, children }) => {
	const { signedIn } = useAuthorization()

	return (
		<>
			{signedIn ? (
				<Route path={path}>{children}</Route>
			) : (
				<Redirect to='/signin' />
			)}
		</>
	)
}

export default ProtectedRoute
