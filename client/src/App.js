import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Singin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { refreshAuthToken } from './store/actions/authActions'
import Messages from './pages/Messages'
import Profile from './pages/Profile'

const App = () => {
	const dispatch = useDispatch()
	const auth = useSelector((state) => state.auth)

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
		</BrowserRouter>
	)
}

export default App
