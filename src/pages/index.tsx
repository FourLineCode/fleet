import { GetServerSideProps } from 'next';
import React from 'react';

interface Props {
	data?: any;
}

const Index = (props: Props) => {
	return (
		<main className='flex flex-col items-center justify-center w-screen h-screen text-4xl font-bold text-gray-200 bg-gray-900'>
			<div>Hello World</div>
		</main>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		props: {},
	};
};

export default Index;
