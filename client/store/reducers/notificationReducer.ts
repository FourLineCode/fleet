import * as actions from '../types'
import { ActionTypes, NotificationState } from './types'

const initState: NotificationState = {
	show: false,
	message: '',
	type: '',
}

const errorReducer = (state = initState, { type, payload }: ActionTypes) => {
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
				type: '',
			}
		}
		case actions.SHOW_NOTIFICATION: {
			return {
				...state,
				show: true,
			}
		}
		case actions.HIDE_NOTIFICATION: {
			return {
				...state,
				show: false,
			}
		}
		default: {
			return state
		}
	}
}

export default errorReducer
