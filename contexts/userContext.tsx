import { createContext, useState } from 'react'
import { UserState } from './types'

interface UserContextType {
	id?: number
	username?: string
	displayName?: string
	bio?: string
	avatarURL?: string
	createdAt?: string
	isAdmin: boolean
}

interface UserContextProperty extends UserContextType {
	setUserInfo: (arg: UserState) => void
	clearCurrentUser: () => void
}

export const UserContext = createContext<UserContextProperty>({
	id: undefined,
	username: undefined,
	displayName: undefined,
	bio: undefined,
	avatarURL: undefined,
	createdAt: undefined,
	isAdmin: false,
	setUserInfo: () => {},
	clearCurrentUser: () => {},
})

interface Props {
	children?: React.ReactNode
}

export const UserContextProvider = ({ children }: Props) => {
	const [user, setUser] = useState<UserContextType>({
		id: undefined,
		username: undefined,
		displayName: undefined,
		bio: undefined,
		avatarURL: undefined,
		createdAt: undefined,
		isAdmin: false,
	})

	const setUserInfo = (payload: UserState) => {
		setUser({
			id: payload.id,
			username: payload.username,
			displayName: payload.displayName,
			bio: payload.bio,
			avatarURL: payload.avatarURL,
			createdAt: payload.createdAt,
			isAdmin: payload.isAdmin,
		})
	}

	const clearCurrentUser = () => {
		setUser({
			id: undefined,
			username: undefined,
			displayName: undefined,
			bio: undefined,
			avatarURL: undefined,
			createdAt: undefined,
			isAdmin: false,
		})
	}

	return <UserContext.Provider value={{ ...user, setUserInfo, clearCurrentUser }}>{children}</UserContext.Provider>
}
