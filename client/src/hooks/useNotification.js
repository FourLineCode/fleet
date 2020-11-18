import { useSelector } from 'react-redux'

const useNotification = () => {
	const notification = useSelector((state) => state.notification)

	return notification
}

export default useNotification
