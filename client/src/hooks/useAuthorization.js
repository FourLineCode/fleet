import { useSelector } from 'react-redux'

const useAuthorization = () => {
	const auth = useSelector((state) => state.auth)

	return auth
}

export default useAuthorization
