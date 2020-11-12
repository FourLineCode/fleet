import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ path, children }) => {
	const { signedIn } = useSelector((state) => state.auth)

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
