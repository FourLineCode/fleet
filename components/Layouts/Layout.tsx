import { gql } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { AuthState } from '../../contexts/types';
import { useAuthorization } from '../../hooks/useAuthorization';
import { client } from '../../utils/apollo';
import { BaseLayout } from './BaseLayout';

interface Props {
	children?: React.ReactNode;
	title?: string;
	desc?: string;
	auth?: AuthState;
}

export const Layout = ({ children, title, desc, auth }: Props) => {
	const { setAuthInfo } = useAuthorization();

	useEffect(() => {
		if (auth && auth.signedIn) {
			setAuthInfo(auth);
		}
	}, [auth]);

	return (
		<BaseLayout title={title} desc={desc}>
			{children}
		</BaseLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const { data } = await client.query({
		query: gql`
			query Authentication {
				refreshToken {
					success
					id
					token
					refreshToken
				}
			}
		`,
	});

	if (data.success) {
		return {
			props: {
				auth: {
					signedIn: data.success,
					id: data.id,
					token: data.token,
					refreshToken: data.refreshToken,
				},
			},
		};
	}

	return { props: {} };
};
