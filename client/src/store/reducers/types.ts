export type RootState = {
	auth: AuthState
	user: UserState
	notification: NotificationState
}

export type ActionTypes = {
	type: string
	payload: any
}

export type AuthState = {
	signedIn: boolean
	token: string | null
	refreshing: boolean
}

export type NotificationState = {
	show: boolean
	message: string
	type: 'error' | 'success' | ''
}

export type UserState = {
	id: string | null
	username: string | null
	displayName: string | null
	createdAt: string | null
}
