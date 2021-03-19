import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import { useEffect } from 'react'
import { QueryClientProvider } from 'react-query'
import { useDispatch } from 'react-redux'
import TopProgressBar from '../components/Layouts/TopProgressBar'
import { useAuthorization } from '../hooks/useAuthorization'
import wrapper from '../store'
import { refreshAuthToken } from '../store/actions/authActions'
import * as actions from '../store/types'
import '../styles/index.css'
import { Notification } from '../ui/components/Notification'
import { theme } from '../ui/themes/ChakraTheme'
import { queryClient } from '../utils/query'

const App = ({ Component, pageProps }: AppProps) => {
	const auth = useAuthorization()
	const dispatch = useDispatch()

	useEffect(() => {
		if (!auth.signedIn) {
			dispatch({ type: actions.SET_REFRESHING })
			dispatch(refreshAuthToken())
		}
	}, [])

	return (
		<NextThemeProvider defaultTheme='dark' attribute='class'>
			<ChakraProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<TopProgressBar />
					<Component {...pageProps} />
					<Notification />
				</QueryClientProvider>
			</ChakraProvider>
		</NextThemeProvider>
	)
}

export default wrapper.withRedux(App)
