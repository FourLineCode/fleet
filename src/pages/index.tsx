import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';

interface Props {
	data: any;
}

const Index = (props: Props) => {
	return (
		<main className='flex flex-col items-center justify-center w-screen h-screen text-4xl font-bold text-gray-200 bg-gray-900'>
			<div>Hello World</div>
			<div className='font-mono text-base font-normal'>
				Data from server: {JSON.stringify(props.data)}
			</div>
		</main>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const res = await axios.get('http://localhost:3000/api/hello');

	return {
		props: {
			data: res.data,
		},
	};
};

export default Index;
