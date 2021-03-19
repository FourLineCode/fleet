import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNotification } from '../../hooks/useNotification'

const Notification = () => {
	const notification = useNotification()
	const toast = useToast()

	useEffect(() => {
		if (notification.trigger && notification.message !== '') {
			toast({
				title: notification.message,
				status: notification.type,
				duration: 3000,
				isClosable: true,
				position: 'bottom',
			})
		}
	}, [notification.trigger])

	return null
}

export default Notification
