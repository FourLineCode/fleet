import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import axios from 'axios';
import App, { AppContext, AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { queryClient } from 'src/shared/queryClient';
import { config } from '~/config/config';
import { theme } from '~/theme/theme';

interface AuthState {
	success: boolean;
	id?: number;
	token?: string;
	refreshToken?: string;
}
interface CustomAppProps extends AppProps {
	auth: AuthState;
}

const MainApp = ({ Component, pageProps, auth }: CustomAppProps) => {
	// TODO: add zustand store for auth
	if (process.browser) {
		console.log(auth);
	}

	return (
		<ChakraProvider theme={theme}>
			<CSSReset />
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
			</QueryClientProvider>
		</ChakraProvider>
	);
};

MainApp.getInitialProps = async (appContext: AppContext) => {
	const appProps = await App.getInitialProps(appContext);

	if (!process.browser) {
		try {
			const res = await axios.get(`${config.api}/user/refreshtoken`);
			const data = res.data;

			return {
				...appProps,
				auth: data,
			};
		} catch (error) {
			return {
				...appProps,
				auth: {
					success: false,
				},
			};
		}
	}

	return { ...appProps };
};

export default MainApp;
