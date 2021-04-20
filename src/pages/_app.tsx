import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { theme } from '~/theme/theme';

const MainApp = ({ Component, pageProps }: AppProps) => {
	return (
		<ChakraProvider theme={theme}>
			<CSSReset />
			<Component {...pageProps} />
		</ChakraProvider>
	);
};

// MainApp.getInitialProps = async (appContext: AppContext) => {
// 	const appProps = await App.getInitialProps(appContext);

// 	return { ...appProps };
// };

export default MainApp;
