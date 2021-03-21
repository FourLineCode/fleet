import React from 'react'
import { AuthContextProvider } from './authContext'
import { NotificationContextProvider } from './notificationContext'
import { UserContextProvider } from './userContext'

interface Props {
	children?: React.ReactNode
}

export const ContextProvider = ({ children }: Props) => {
	return (
		<AuthContextProvider>
			<UserContextProvider>
				<NotificationContextProvider>{children}</NotificationContextProvider>
			</UserContextProvider>
		</AuthContextProvider>
	)
}
