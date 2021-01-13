import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ProtectedLayout from '../../components/ProtectedLayout'
import useCurrentUser from '../../hooks/useCurrentUser'

const Profile = () => {
	const user = useCurrentUser()
	const router = useRouter()

	useEffect(() => {
		if (user.id) {
			router.push(`/profile/${user.id}`)
		}
	}, [user.id])

	return <ProtectedLayout title='Profile | Fleet' />
}

export default Profile
