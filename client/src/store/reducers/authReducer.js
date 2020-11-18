import * as actions from '../types'

const initState = {
	signedIn: false,
	token: null,
}

const authReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case actions.SIGN_IN: {
			return {
				...state,
				signedIn: payload.success,
				token: payload.token,
			}
		}
		case actions.SIGN_OUT: {
			return {
				...state,
				signedIn: false,
				token: null,
			}
		}
		default:
			return state
	}
}

export default authReducer
