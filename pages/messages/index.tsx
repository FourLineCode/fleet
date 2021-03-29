import { ProtectedLayout } from '../../components/Layouts/ProtectedLayout';
import { ComingSoon } from '../../components/Navigation/ComingSoon';
import { Menu } from '../../components/Navigation/Menu';

const Messages = () => {
	return (
		<ProtectedLayout title='Messages'>
			<div className='grid min-h-screen grid-cols-4 bg-light dark:bg-dark-800 gap-x-4'>
				<Menu />
				<ComingSoon feature='Messages' />
			</div>
		</ProtectedLayout>
	);
};

export default Messages;
