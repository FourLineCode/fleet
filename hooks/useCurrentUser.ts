import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'

export const useCurrentUser = () => {
	const user = useContext(UserContext)

	return user
}
