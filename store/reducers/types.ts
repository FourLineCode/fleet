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
	refreshing: 'init' | 'refreshing' | 'done'
}

export interface NotificationState {
	message: string
	type: 'error' | 'success'
	trigger: boolean
}

export interface UserState {
	id: string | null
	username: string | null
	displayName: string | null
	bio: string | null
	createdAt: string | null
	isAdmin: boolean
}
