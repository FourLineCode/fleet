import { Stack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import React from 'react';
import { preloadData } from 'src/shared/preloadData';
import { Discover } from '~components/discover/Discover';
import { FleetView } from '~components/fleet/FleetView';
import { Content } from '~components/layouts/Content';
import { Layout } from '~components/layouts/Layout';
import { FleetData } from '~components/timeline/FleetTimeline';

const FleetDetails = ({ post, liked }: FleetData) => {
	return (
		<Layout authorized title='Fleet' desc='Fleet Details'>
			<Content>
				<Stack display='flex' direction='row' w='100%'>
					<FleetView fleet={post} liked={liked} />
					<Discover />
				</Stack>
			</Content>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.query;

	const data = await preloadData(`/fleet/${id}`, context);

	return {
		props: {
			post: data.post,
			liked: data.liked,
		},
	};
};

export default FleetDetails;
