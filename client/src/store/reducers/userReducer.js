import * as actions from '../types'

const initState = {
	id: null,
	username: null,
	displayName: null,
	error: null,
}

const userReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case actions.GET_USER_INFO: {
			return {
				...state,
				id: payload.id,
				username: payload.username,
				displayName: payload.displayName,
				error: null,
			}
		}
		case actions.GET_USER_INFO_ERROR: {
			console.log(payload)
			return {
				...state,
				error: payload.data,
			}
		}
		case actions.CLEAR_CURRENT_USER: {
			return {
				id: null,
				username: null,
				displayName: null,
				error: null,
			}
		}
		default:
			return state
	}
}

export default userReducer
