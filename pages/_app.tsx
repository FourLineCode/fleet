import { MuiThemeProvider } from '@material-ui/core'
import { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import { QueryClientProvider } from 'react-query'
import { useDispatch } from 'react-redux'
import useAuthorization from '../hooks/useAuthorization'
import useNotification from '../hooks/useNotification'
import wrapper from '../store'
import { refreshAuthToken } from '../store/actions/authActions'
import * as actions from '../store/types'
import '../styles/index.css'
import Notification from '../ui/components/Notification'
import theme from '../ui/themes/MuiTheme'
import queryClient from '../utils/query'

const App = ({ Component, pageProps }: AppProps) => {
	const notification = useNotification()
	const auth = useAuthorization()
	const dispatch = useDispatch()

	useEffect(() => {
		if (!auth.signedIn) {
			dispatch({ type: actions.SET_REFRESHING })
			dispatch(refreshAuthToken())
		}
	}, [])

	return (
		<MuiThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
				{notification.show && notification.message !== '' && (
					<Notification message={notification.message} type={notification.type} />
				)}
			</QueryClientProvider>
		</MuiThemeProvider>
	)
}

export default wrapper.withRedux(App)
