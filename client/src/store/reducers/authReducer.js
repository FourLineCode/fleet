import useLocalStorage from '../../hooks/useLocalStorage'
import * as actions from '../types'

const { getLocalStorage } = useLocalStorage()

const refreshToken = getLocalStorage('refresh-token')

const initState = {
	signedIn: false,
	token: null,
	refreshing: refreshToken !== undefined,
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
		case actions.SET_REFRESHING: {
			return {
				...state,
				refreshing: true,
			}
		}
		case actions.SET_NOT_REFRESHING: {
			return {
				...state,
				refreshing: false,
			}
		}
		default:
			return state
	}
}

export default authReducer
