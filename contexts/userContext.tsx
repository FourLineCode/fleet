import { createContext, useState } from 'react'
import { UserState } from './types'

interface UserContextType {
	id?: string
	username?: string
	displayName?: string
	bio?: string
	avatarURL?: string
	createdAt?: string
	isAdmin: boolean
	setUserInfo: (arg: UserState) => void
	clearCurrentUser: () => void
}

export const UserContext = createContext<UserContextType>({
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
	const [id, setId] = useState<string | undefined>(undefined)
	const [username, setUsername] = useState<string | undefined>(undefined)
	const [displayName, setDisplayName] = useState<string | undefined>(undefined)
	const [bio, setBio] = useState<string | undefined>(undefined)
	const [avatarURL, setAvatarURL] = useState<string | undefined>(undefined)
	const [createdAt, setCreatedAt] = useState<string | undefined>(undefined)
	const [isAdmin, setIsAdmin] = useState<boolean>(false)

	const setUserInfo = (payload: UserState) => {
		setId(payload.id)
		setUsername(payload.username)
		setDisplayName(payload.displayName)
		setBio(payload.bio)
		setAvatarURL(payload.avatarURL)
		setCreatedAt(payload.createdAt)
		setIsAdmin(payload.isAdmin)
	}

	const clearCurrentUser = () => {
		setId(undefined)
		setUsername(undefined)
		setDisplayName(undefined)
		setBio(undefined)
		setAvatarURL(undefined)
		setCreatedAt(undefined)
		setIsAdmin(false)
	}

	return (
		<UserContext.Provider
			value={{ id, username, displayName, bio, avatarURL, createdAt, isAdmin, setUserInfo, clearCurrentUser }}
		>
			{children}
		</UserContext.Provider>
	)
}
