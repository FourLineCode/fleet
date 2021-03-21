import { createContext, useState } from 'react'

interface NotificationContextType {
	message: string
	type: 'error' | 'success'
	trigger: boolean
	showErrorMessage: (arg: string) => void
	showSuccessMessage: (arg: string) => void
	clearNotification: () => void
}

export const NotificationContext = createContext<NotificationContextType>({
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
	const [message, setMessage] = useState<string>('')
	const [type, setType] = useState<'error' | 'success'>('success')
	const [trigger, setTrigger] = useState<boolean>(false)

	const showErrorMessage = (error: string) => {
		setType('error')
		setMessage(error)
		setTrigger(true)

		const timeout = setTimeout(() => {
			setTrigger(false)
			clearTimeout(timeout)
		}, 100)
	}

	const showSuccessMessage = (success: string) => {
		setType('success')
		setMessage(success)
		setTrigger(true)

		const timeout = setTimeout(() => {
			setTrigger(false)
			clearTimeout(timeout)
		}, 100)
	}

	const clearNotification = () => {
		setMessage('')
		setType('success')
	}

	return (
		<NotificationContext.Provider
			value={{ message, type, trigger, showErrorMessage, showSuccessMessage, clearNotification }}
		>
			{children}
		</NotificationContext.Provider>
	)
}
