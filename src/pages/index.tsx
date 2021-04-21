import { GetServerSideProps } from 'next';
import { Layout } from '~/components/Layouts/Layout';

const Index = () => {
	return <Layout title='Fleet' />;
};

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		props: {},
		redirect: {
			permanent: false,
			destination: '/home',
		},
	};
};

export default Index;
