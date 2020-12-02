import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import useNotification from './hooks/useNotification'
import Home from './pages/Home'
import Messages from './pages/Messages'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Singin from './pages/Signin'
import Signup from './pages/Signup'
import Notification from './ui/Notification'

const App: React.FC = () => {
	const notification = useNotification()

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
				<ProtectedRoute path='/profile/:id'>
					<Profile />
				</ProtectedRoute>
				<Route exact path='*'>
					<NotFound />
				</Route>
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
