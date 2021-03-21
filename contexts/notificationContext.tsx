import { createContext, useState } from 'react'

interface NotificationContextType {
	message: string
	type: 'error' | 'success'
	trigger: boolean
}

interface NotificationContextProperty extends NotificationContextType {
	showErrorMessage: (arg: string) => void
	showSuccessMessage: (arg: string) => void
	clearNotification: () => void
}

export const NotificationContext = createContext<NotificationContextProperty>({
	message: '',
	type: 'success',
	trigger: false,
	showErrorMessage: () => {},
	showSuccessMessage: () => {},
	clearNotification: () => {},
})

interface Props {
	children?: React.ReactNode
}

export const NotificationContextProvider = ({ children }: Props) => {
	const [notification, setNotification] = useState<NotificationContextType>({
		message: '',
		type: 'success',
		trigger: false,
	})

	const showErrorMessage = (error: string) => {
		setNotification({
			message: error,
			type: 'error',
			trigger: true,
		})

		const timeout = setTimeout(() => {
			setNotification((prev) => ({ ...prev, trigger: false }))
			clearTimeout(timeout)
		}, 100)
	}

	const showSuccessMessage = (success: string) => {
		setNotification({
			message: success,
			type: 'success',
			trigger: true,
		})

		const timeout = setTimeout(() => {
			setNotification((prev) => ({ ...prev, trigger: false }))
			clearTimeout(timeout)
		}, 100)
	}

	const clearNotification = () => {
		setNotification((prev) => ({
			...prev,
			message: '',
			type: 'success',
		}))
	}

	return (
		<NotificationContext.Provider
			value={{ ...notification, showErrorMessage, showSuccessMessage, clearNotification }}
		>
			{children}
		</NotificationContext.Provider>
	)
}
