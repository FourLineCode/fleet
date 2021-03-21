export interface AuthState {
	signedIn: boolean
	id?: string
	token?: string
	refreshToken?: string
}

export interface UserState {
	id?: string
	username?: string
	displayName?: string
	bio?: string
	avatarURL?: string
	createdAt?: string
	isAdmin: boolean
}

export interface NotificationState {
	message: string
	type: 'error' | 'success'
	trigger: boolean
}
