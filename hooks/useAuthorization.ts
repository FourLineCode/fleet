import { useSelector } from 'react-redux'
import { RootState } from '../store/reducers/types'

const useAuthorization = () => {
	const auth = useSelector((state: RootState) => state.auth)

	return auth
}

export default useAuthorization
