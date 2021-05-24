import React from 'react';
import { ComingSooon } from '~components/layouts/ComingSoon';
import { Layout } from '~components/layouts/Layout';

const Messages = () => {
	return (
		<Layout authorized title='Messages' desc='Messages Page'>
			<ComingSooon />
		</Layout>
	);
};

export default Messages;
