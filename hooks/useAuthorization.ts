import { useSelector } from 'react-redux'
import { RootState } from '../store/reducers/types'

export const useAuthorization = () => {
	const auth = useSelector((state: RootState) => state.auth)

	return auth
}
