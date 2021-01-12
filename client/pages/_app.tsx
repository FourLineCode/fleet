import { MuiThemeProvider } from '@material-ui/core'
import { AppProps } from 'next/app'
import React from 'react'
import useNotification from '../hooks/useNotification'
import wrapper from '../store'
import '../styles/index.css'
import Notification from '../ui/Notification'
import theme from '../ui/themes/MuiTheme'

const App = ({ Component, pageProps }: AppProps) => {
	const notification = useNotification()

	return (
		<React.StrictMode>
			<MuiThemeProvider theme={theme}>
				<Component {...pageProps} />
				{notification.show && notification.message !== '' && (
					<Notification message={notification.message} type={notification.type} />
				)}
			</MuiThemeProvider>
		</React.StrictMode>
	)
}

export default wrapper.withRedux(App)
