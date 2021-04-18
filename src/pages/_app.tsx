import App, { AppContext, AppProps } from 'next/app';
import '../../styles/index.css';

const MainApp = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

MainApp.getInitialProps = async (appContext: AppContext) => {
	const appProps = await App.getInitialProps(appContext);

	return { ...appProps };
};

export default MainApp;
