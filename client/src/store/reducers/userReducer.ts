import * as actions from '../types'
import { ActionTypes, UserState } from './types'

const initState: UserState = {
	id: null,
	username: null,
	displayName: null,
	createdAt: null,
}

const userReducer = (state = initState, { type, payload }: ActionTypes) => {
	switch (type) {
		case actions.GET_USER_INFO: {
			return {
				...state,
				id: payload.id,
				username: payload.username,
				displayName: payload.displayName,
				createdAt: payload.createdAt,
			}
		}
		case actions.CLEAR_CURRENT_USER: {
			return {
				id: null,
				username: null,
				displayName: null,
				createdAt: null,
			}
		}
		default:
			return state
	}
}

export default userReducer
