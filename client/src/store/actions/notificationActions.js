import * as actions from '../types'

export const setError = (message) => (dispatch, getState) => {
	const state = getState()
	if (!state.notification.show) {
		dispatch({ type: actions.ERROR, payload: message })
		dispatch({ type: actions.SHOW_NOTIFICATION })
		const timeout = setTimeout(() => {
			dispatch({ type: actions.HIDE_NOTIFICATION })
			dispatch({ type: actions.CLEAR_NOTIFICATION })
			clearTimeout(timeout)
		}, 3000)
	}
}

export const setSuccess = (message) => (dispatch, getState) => {
	const state = getState()
	if (!state.notification.show) {
		dispatch({ type: actions.SUCCESS, payload: message })
		dispatch({ type: actions.SHOW_NOTIFICATION })
		const timeout = setTimeout(() => {
			dispatch({ type: actions.HIDE_NOTIFICATION })
			dispatch({ type: actions.CLEAR_NOTIFICATION })
			clearTimeout(timeout)
		}, 3000)
	}
}

export const clearNotification = () => (dispatch) => {
	dispatch({ type: actions.CLEAR_NOTIFICATION })
}
