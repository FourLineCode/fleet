import * as actions from '../types'

export const setError = (message: string) => (dispatch: any) => {
	dispatch({ type: actions.ERROR, payload: message })
	dispatch({ type: actions.SHOW_NOTIFICATION })
	const timeout = setTimeout(() => {
		dispatch({ type: actions.HIDE_NOTIFICATION })
		dispatch({ type: actions.CLEAR_NOTIFICATION })
		clearTimeout(timeout)
	}, 100)
}

export const setSuccess = (message: string) => (dispatch: any) => {
	dispatch({ type: actions.SUCCESS, payload: message })
	dispatch({ type: actions.SHOW_NOTIFICATION })
	const timeout = setTimeout(() => {
		dispatch({ type: actions.HIDE_NOTIFICATION })
		dispatch({ type: actions.CLEAR_NOTIFICATION })
		clearTimeout(timeout)
	}, 100)
}

export const clearNotification = () => (dispatch: any) => {
	dispatch({ type: actions.CLEAR_NOTIFICATION })
}
