import { Stack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import React from 'react';
import { preloadData } from 'src/shared/preloadData';
import { UserType } from 'src/shared/types';
import { Discover } from '~components/discover/Discover';
import { Content } from '~components/layouts/Content';
import { Layout } from '~components/layouts/Layout';
import { Profile } from '~components/profile/Profile';
import { UserNotFound } from '~components/profile/UserNotFound';

interface Props {
	user?: UserType;
}

const ProfilePage = ({ user }: Props) => {
	return (
		<Layout authorized title='Profile' desc='Profile Page'>
			<Content>
				<Stack display='flex' direction='row' w='100%'>
					{user ? <Profile user={user} /> : <UserNotFound />}
					<Discover />
				</Stack>
			</Content>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.query;

	const data = await preloadData(`/user/info/${id}`, context);

	if (!data) {
		return {
			props: {},
		};
	}

	return {
		props: {
			user: data,
		},
	};
};

export default ProfilePage;
