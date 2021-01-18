export interface RootState {
	auth: AuthState
	user: UserState
	notification: NotificationState
}

export interface ActionTypes {
	type: string
	payload: any
}

export interface AuthState {
	signedIn: boolean
	id: string | null
	token: string | null
	refreshing: boolean
}

export interface NotificationState {
	show: boolean
	message: string
	type: 'error' | 'success'
}

export interface UserState {
	id: string | null
	username: string | null
	displayName: string | null
	bio: string | null
	createdAt: string | null
	isAdmin: boolean
}
