import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import useAuthorization from './hooks/useAuthorization'
import useNotification from './hooks/useNotification'
import Home from './pages/Home'
import Messages from './pages/Messages'
import Profile from './pages/Profile'
import Singin from './pages/Signin'
import Signup from './pages/Signup'
import { refreshAuthToken } from './store/actions/authActions'
import Notification from './ui/Notification'

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
				<Notification
					message={notification.message}
					type={notification.type}
				/>
			)}
		</BrowserRouter>
	)
}

export default App
