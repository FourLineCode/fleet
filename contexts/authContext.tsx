import { gql } from '@apollo/client'
import { createContext, useContext, useState } from 'react'
import { client } from '../utils/apollo'
import { NotificationContext } from './notificationContext'
import { AuthState } from './types'
import { UserContext } from './userContext'

interface AuthContextType {
	signedIn: boolean
	id?: number
	token?: string
	refreshToken?: string
}

interface AuthContextProperty extends AuthContextType {
	signIn: (arg: { email: string; password: string }) => void
	setAuthInfo: (arg: AuthState) => void
	signOut: () => void
}

export const AuthContext = createContext<AuthContextProperty>({
	signedIn: false,
	id: undefined,
	token: undefined,
	refreshToken: undefined,
	signIn: () => {},
	setAuthInfo: () => {},
	signOut: () => {},
})

interface Props {
	children?: React.ReactNode
}

export const AuthContextProvider = ({ children }: Props) => {
	const [auth, setAuth] = useState<AuthContextType>({
		signedIn: false,
		id: undefined,
		token: undefined,
		refreshToken: undefined,
	})

	const notification = useContext(NotificationContext)
	const user = useContext(UserContext)

	const signIn = async ({ email, password }: { email: string; password: string }) => {
		const { data } = await client.mutate({
			mutation: gql`
				mutation SingnIn($email: String!, $password: String!) {
					signIn(email: $email, password: $password) {
						success
						id
						token
						refreshToken
					}
				}
			`,
			variables: {
				email,
				password,
			},
		})

		setAuthInfo(data.signIn)
	}

	const setAuthInfo = async (payload: AuthState) => {
		setAuth({
			signedIn: true,
			id: payload.id,
			token: payload.token,
			refreshToken: payload.refreshToken,
		})

		const { data } = await client.query({
			query: gql`
				query UserInfo($id: Int!) {
					userInfo(id: $id) {
						id
						username
						displayName
						bio
						avatarURL
						createdAt
						isAdmin
					}
				}
			`,
			variables: {
				id: payload.id,
			},
		})

		user.setUserInfo(data)

		notification.showSuccessMessage('Successfully signed in')
	}

	const signOut = () => {
		setAuth({
			signedIn: false,
			id: undefined,
			token: undefined,
			refreshToken: undefined,
		})

		user.clearCurrentUser()

		notification.showSuccessMessage('Successfully signed out')
	}

	return <AuthContext.Provider value={{ ...auth, setAuthInfo, signIn, signOut }}>{children}</AuthContext.Provider>
}
