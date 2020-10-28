import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Singin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'

const App = () => {
	const { signedIn } = useSelector((state) => state.auth)

	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path='/'>
					{signedIn ? <Home /> : <Redirect to='/signin' />}
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
