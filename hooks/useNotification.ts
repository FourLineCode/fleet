import { useContext } from 'react';
import { NotificationContext } from '../contexts/notificationContext';

export const useNotification = () => {
	const notification = useContext(NotificationContext);

	return notification;
};
