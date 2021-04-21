import { useToast } from '@chakra-ui/toast';

interface NotificationProps {
	message: string;
	desc?: string;
	type: 'info' | 'warning' | 'success' | 'error';
}

export const useNotification = ({ message, desc, type }: NotificationProps) => {
	const toast = useToast({
		title: message,
		description: desc,
		status: type,
		duration: 5000,
		isClosable: true,
		position: 'bottom',
		variant: 'solid',
	});

	return toast;
};
