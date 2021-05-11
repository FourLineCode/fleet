import { Stack } from '@chakra-ui/react';
import React from 'react';
import { Discover } from '~components/discover/Discover';
import { Content } from '~components/layouts/Content';
import { Layout } from '~components/layouts/Layout';
import { Timeline } from '~components/timeline/Timeline';

const Home = () => {
	return (
		<Layout authorized title='Home' desc='Home Page'>
			<Content>
				<Stack display='flex' direction='row' w='100%'>
					<Timeline />
					<Discover />
				</Stack>
			</Content>
		</Layout>
	);
};

export default Home;
