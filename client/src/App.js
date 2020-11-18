import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Navbar from './components/Navbar'
import Singin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { refreshAuthToken } from './store/actions/authActions'
import Messages from './pages/Messages'
import Profile from './pages/Profile'
import useAuthorization from './hooks/useAuthorization'
import Notification from './ui/Notification'
import useNotification from './hooks/useNotification'

const App = () => {
	const dispatch = useDispatch()
	const auth = useAuthorization()
	const notification = useNotification()

	useEffect(() => {
		if (!auth.signedIn) {
			dispatch(refreshAuthToken())
		}
	}, [auth.signedIn])

	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path='/'>
					<Redirect to='/home' />
				</Route>
				<Route exact path='/signup'>
					<Signup />
				</Route>
				<Route exact path='/signin'>
					<Singin />
				</Route>
				<ProtectedRoute path='/home'>
					<Home />
				</ProtectedRoute>
				<ProtectedRoute path='/messages'>
					<Messages />
				</ProtectedRoute>
				<ProtectedRoute path='/profile'>
					<Profile />
				</ProtectedRoute>
			</Switch>
			{notification.show && notification.message !== '' && (
				<Notification message={notification.message} type={notification.type} />
			)}
		</BrowserRouter>
	)
}

export default App
