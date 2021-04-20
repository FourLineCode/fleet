import { GetServerSideProps } from 'next';

interface Props {
	data?: any;
}

const Index = (props: Props) => {
	return null;
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
