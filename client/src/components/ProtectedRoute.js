import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import useAuthorization from '../hooks/useAuthorization'
import { refreshAuthToken } from '../store/actions/authActions'

const ProtectedRoute = ({ path, children }) => {
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
