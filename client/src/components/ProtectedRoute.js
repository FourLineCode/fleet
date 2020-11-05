import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
	const { signedIn } = useSelector((state) => state.auth)

	return <>{signedIn ? <>{children}</> : <Redirect to='/signin' />}</>
}

export default ProtectedRoute
