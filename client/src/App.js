import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar'
import Singin from './pages/Signin'
import Signup from './pages/Signup'

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path='/'>
					<Redirect to='/signup' />
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
