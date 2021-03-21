import { ActionTypes, AuthState } from '../../contexts/types'
import * as actions from '../types'

const initState: AuthState = {
	signedIn: false,
	id: null,
	token: null,
	refreshing: 'init',
}

export const authReducer = (state = initState, { type, payload }: ActionTypes) => {
	switch (type) {
		case actions.SIGN_IN: {
			return {
				...state,
				signedIn: payload.success,
				id: payload.id,
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
				refreshing: 'refreshing',
			}
		}
		case actions.SET_NOT_REFRESHING: {
			return {
				...state,
				refreshing: 'done',
			}
		}
		default:
			return state
	}
}
