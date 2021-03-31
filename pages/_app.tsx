import { ApolloProvider, gql } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import App, { AppContext, AppProps } from 'next/app';
import { useEffect } from 'react';
import { ContextProvider } from '../contexts';
import { useAuthorization } from '../hooks/useAuthorization';
import '../styles/index.css';
import { theme } from '../ui/themes/ChakraTheme';
import { client } from '../utils/apollo';

const MainApp = ({ Component, pageProps }: AppProps) => {
	const { setAuthInfo } = useAuthorization();

	useEffect(() => {
		if (pageProps.auth && pageProps.auth.signedIn) {
			setAuthInfo(pageProps.auth);
		}
	}, [pageProps]);

	return (
		<ContextProvider>
			<NextThemeProvider defaultTheme='dark' attribute='class'>
				<ChakraProvider theme={theme}>
					<ApolloProvider client={client}>
						<Component {...pageProps} />
					</ApolloProvider>
				</ChakraProvider>
			</NextThemeProvider>
		</ContextProvider>
	);
};

MainApp.getInitialProps = async (appContext: AppContext) => {
	const appProps = await App.getInitialProps(appContext);

	const { data } = await client.query({
		query: gql`
			query Authentication {
				refreshToken {
					success
					id
					token
					refreshToken
				}
			}
		`,
	});

	if (data.success) {
		return {
			...appProps,
			auth: {
				signedIn: data.success,
				id: data.id,
				token: data.token,
				refreshToken: data.refreshToken,
			},
		};
	}

	return { ...appProps };
};

export default MainApp;
