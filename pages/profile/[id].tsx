import { ProtectedLayout } from '../../components/Layouts/ProtectedLayout'
import { Menu } from '../../components/Navigation/Menu'
import { ProfileCard } from '../../components/Profile/ProfileCard'
import { Recommend } from '../../components/Recommend/Recommend'

const Profile = () => {
	return (
		<ProtectedLayout title='Profile'>
			<div className='grid min-h-screen grid-cols-4 bg-light dark:bg-dark-800 gap-x-4'>
				<Menu />
				<ProfileCard />
				<Recommend />
			</div>
		</ProtectedLayout>
	)
}

export default Profile
