import React from 'react';
import { ComingSooon } from '~components/layouts/ComingSoon';
import { Layout } from '~components/layouts/Layout';

const Settings = () => {
	return (
		<Layout authorized title='Settings' desc='Settings Page'>
			<ComingSooon />
		</Layout>
	);
};

export default Settings;
