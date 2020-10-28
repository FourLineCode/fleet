import * as actions from '../types'

const initState = {
	signedIn: false,
	token: null,
	error: null,
}

const authReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case actions.SIGN_IN: {
			return {
				...state,
				signedIn: payload.success,
				token: payload.token,
				error: null,
			}
		}
		case actions.SIGN_IN_ERROR: {
			return {
				...state,
				error: payload.data,
			}
		}
		default:
			return state
	}
}

export default authReducer
