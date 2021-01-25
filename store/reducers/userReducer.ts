import * as actions from '../types'
import { ActionTypes, UserState } from './types'

const initState: UserState = {
	id: null,
	username: null,
	displayName: null,
	bio: null,
	createdAt: null,
	isAdmin: false,
}

const userReducer = (state = initState, { type, payload }: ActionTypes) => {
	switch (type) {
		case actions.GET_USER_INFO: {
			return {
				...state,
				id: payload.id,
				username: payload.username,
				displayName: payload.displayName,
				bio: payload.bio,
				createdAt: payload.createdAt,
				isAdmin: payload.isAdmin,
			}
		}
		case actions.CLEAR_CURRENT_USER: {
			return {
				id: null,
				username: null,
				displayName: null,
				bio: null,
				createdAt: null,
				isAdmin: false,
			}
		}
		default:
			return state
	}
}

export default userReducer
