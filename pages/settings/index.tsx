import { ProtectedLayout } from '../../components/Layouts/ProtectedLayout';
import { ComingSoon } from '../../components/Navigation/ComingSoon';
import { Menu } from '../../components/Navigation/Menu';

const Settings = () => {
	return (
		<ProtectedLayout title='Settings'>
			<div className='grid min-h-screen grid-cols-4 bg-light dark:bg-dark-800 gap-x-4'>
				<Menu />
				<ComingSoon feature='Settings' />
			</div>
		</ProtectedLayout>
	);
};

export default Settings;
