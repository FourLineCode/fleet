import useLocalStorage from '../../hooks/useLocalStorage'
import * as actions from '../types'
import { ActionTypes, AuthState } from './types'

const { getLocalStorage } = useLocalStorage()

const refreshToken = getLocalStorage('refresh-token')

const initState: AuthState = {
	signedIn: false,
	id: null,
	token: null,
	apiConfig: {
		headers: {
			Authorization: null,
		},
	},
	refreshing: refreshToken !== undefined,
}

const authReducer = (state = initState, { type, payload }: ActionTypes) => {
	switch (type) {
		case actions.SIGN_IN: {
			return {
				...state,
				signedIn: payload.success,
				id: payload.id,
				token: payload.token,
				apiConfig: {
					headers: {
						Authorization: `Bearer ${payload.token}`,
					},
				},
			}
		}
		case actions.SIGN_OUT: {
			return {
				...state,
				signedIn: false,
				token: null,
				apiConfig: {
					headers: {
						Authorization: null,
					},
				},
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
