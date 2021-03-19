import { useSelector } from 'react-redux'
import { RootState } from '../store/reducers/types'

export const useCurrentUser = () => {
	const user = useSelector((state: RootState) => state.user)

	return user
}
