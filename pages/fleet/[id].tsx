import { FleetDetails } from '../../components/Fleet/FleetDetails'
import { ProtectedLayout } from '../../components/Layouts/ProtectedLayout'
import { Menu } from '../../components/Navigation/Menu'
import { Recommend } from '../../components/Recommend/Recommend'

const Profile = () => {
	return (
		<ProtectedLayout title='Post'>
			<div className='grid min-h-screen grid-cols-4 bg-light dark:bg-dark-800 gap-x-4'>
				<Menu />
				<FleetDetails />
				<Recommend />
			</div>
		</ProtectedLayout>
	)
}

export default Profile
