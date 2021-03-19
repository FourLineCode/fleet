import { useSelector } from 'react-redux'
import { RootState } from '../store/reducers/types'

export const useNotification = () => {
	const notification = useSelector((state: RootState) => state.notification)

	return notification
}
