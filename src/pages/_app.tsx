import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import axios from 'axios';
import App, { AppContext, AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from 'src/shared/queryClient';
import { config } from '~config/config';
import { AuthState, useAuth } from '~store/useAuth';
import { theme } from '~theme/theme';

interface CustomAppProps extends AppProps {
	auth: Partial<AuthState>;
}

const MainApp = ({ Component, pageProps, auth }: CustomAppProps) => {
	const authState = useAuth();

	useEffect(() => {
		if (process.browser) {
			authState.setAuthInfo(auth);
		}
	}, []);

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
			const res = await axios.get(`${config.api}/user/refreshtoken`, {
				headers: {
					// @ts-ignore
					Cookie: Object.entries(appContext.ctx.req.cookies)
						.map(([key, value]) => `${key}=${value}`)
						.join('; '),
				},
			});
			const data = res.data;

			return {
				...appProps,
				auth: {
					authorized: data.success,
					id: data.id,
					token: data.token,
					refreshToken: data.refreshToken,
				},
			};
		} catch (error) {
			return {
				...appProps,
				auth: {
					authorized: false,
					id: null,
					token: null,
					refreshToken: null,
				},
			};
		}
	}

	return { ...appProps };
};

export default MainApp;
