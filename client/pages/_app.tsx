import { MuiThemeProvider } from '@material-ui/core'
import { AppProps } from 'next/app'
import React from 'react'
import { QueryClientProvider } from 'react-query'
import useNotification from '../hooks/useNotification'
import wrapper from '../store'
import '../styles/index.css'
import Notification from '../ui/components/Notification'
import theme from '../ui/themes/MuiTheme'
import queryClient from '../utils/query'

const App = ({ Component, pageProps }: AppProps) => {
	const notification = useNotification()

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
