import * as actions from '../types'
import { ActionTypes, NotificationState } from './types'

const initState: NotificationState = {
	message: '',
	type: 'success',
	trigger: false,
}

const notificationReducer = (state = initState, { type, payload }: ActionTypes) => {
	switch (type) {
		case actions.ERROR: {
			return {
				...state,
				message: payload,
				type: 'error',
			}
		}
		case actions.SUCCESS: {
			return {
				...state,
				message: payload,
				type: 'success',
			}
		}
		case actions.CLEAR_NOTIFICATION: {
			return {
				...state,
				message: '',
				type: 'success',
			}
		}
		case actions.SHOW_NOTIFICATION: {
			return {
				...state,
				trigger: true,
			}
		}
		case actions.HIDE_NOTIFICATION: {
			return {
				...state,
				trigger: false,
			}
		}
		default: {
			return state
		}
	}
}

export default notificationReducer
