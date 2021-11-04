import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import App, { AppContext, AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { preloadAppData } from 'src/shared/preloadData';
import { queryClient } from 'src/shared/queryClient';
import { ErrorFallback } from '~components/layouts/ErrorFallback';
import { PROD } from '~config/config';
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
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<Component {...pageProps} />
					{!PROD && <ReactQueryDevtools />}
				</ErrorBoundary>
			</QueryClientProvider>
		</ChakraProvider>
	);
};

MainApp.getInitialProps = async (appContext: AppContext) => {
	const appProps = await App.getInitialProps(appContext);

	if (!process.browser) {
		try {
			const res = await preloadAppData('/user/refreshtoken', appContext);
			const data = res.data;

			appContext.ctx.res?.setHeader('Set-Cookie', res.headers['set-cookie']);

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
