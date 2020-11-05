import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Singin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { getUserInfo } from './store/actions/userActions'

const App = () => {
	const dispatch = useDispatch()
	const auth = useSelector((state) => state.auth)

	useEffect(() => {
		if (auth.signedIn) {
			dispatch(getUserInfo())
		}
	}, [auth.signedIn])

	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path='/'>
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				</Route>
				<Route exact path='/signup'>
					<Signup />
				</Route>
				<Route exact path='/signin'>
					<Singin />
				</Route>
			</Switch>
		</BrowserRouter>
	)
}

export default App
