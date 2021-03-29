import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import App, { AppContext, AppProps } from 'next/app';
import { ContextProvider } from '../contexts';
import '../styles/index.css';
import { theme } from '../ui/themes/ChakraTheme';
import { client } from '../utils/apollo';

const MainApp = ({ Component, pageProps }: AppProps) => {
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

	return { ...appProps };
};

export default MainApp;
