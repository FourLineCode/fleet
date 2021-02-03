import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import { QueryClientProvider } from 'react-query'
import { useDispatch } from 'react-redux'
import useAuthorization from '../hooks/useAuthorization'
import wrapper from '../store'
import { refreshAuthToken } from '../store/actions/authActions'
import * as actions from '../store/types'
import '../styles/index.css'
import Notification from '../ui/components/Notification'
import theme from '../ui/themes/ChakraTheme'
import queryClient from '../utils/query'

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
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
				<Notification />
			</QueryClientProvider>
		</ChakraProvider>
	)
}

export default wrapper.withRedux(App)
