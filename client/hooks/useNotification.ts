import { useSelector } from 'react-redux'
import { RootState } from '../store/reducers/types'

const useNotification = () => {
	const notification = useSelector((state: RootState) => state.notification)

	return notification
}

export default useNotification
