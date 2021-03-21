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
	signIn: (arg: { email: string; password: string }) => void
	setAuthInfo: (arg: AuthState) => void
	signOut: () => void
}

export const AuthContext = createContext<AuthContextType>({
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
	const [signedIn, setSignedIn] = useState<boolean>(false)
	const [id, setId] = useState<number | undefined>(undefined)
	const [token, setToken] = useState<string | undefined>(undefined)
	const [refreshToken, setRefreshToken] = useState<string | undefined>(undefined)

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
		setSignedIn(true)
		setId(payload.id)
		setToken(payload.token)
		setRefreshToken(payload.refreshToken)

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
		setSignedIn(false)
		setId(undefined)
		setToken(undefined)
		setRefreshToken(undefined)

		user.clearCurrentUser()

		notification.showSuccessMessage('Successfully signed out')
	}

	return (
		<AuthContext.Provider value={{ signedIn, id, token, refreshToken, setAuthInfo, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	)
}
