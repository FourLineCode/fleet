import axios from 'axios'
import { BASE_URL } from '../../config'
import useLocalStorage from '../../hooks/useLocalStorage'
import * as actions from '../types'
import { setError, setSuccess } from './notificationActions'
import { getUserInfo } from './userActions'

interface Credentials {
	email: string
	password: string
}

export const signin = (credentials: Credentials) => async (dispatch: any) => {
	try {
		const response = await axios.post(`${BASE_URL}/user/signin`, credentials)
		const data = await response.data

		if (data) {
			dispatch({ type: actions.SIGN_IN, payload: data })
			dispatch(getUserInfo())
		}

		const { setLocalStorage } = useLocalStorage()

		setLocalStorage('refresh-token', data.refreshToken)
	} catch (error) {
		if (error.response.data) {
			dispatch(setError(error.response.data.message))
		} else {
			console.log(error)
		}
	}
}

export const signout = () => (dispatch: any) => {
	const { removeLocalStorage } = useLocalStorage()
	removeLocalStorage('refresh-token')

	dispatch({ type: actions.SIGN_OUT })
	dispatch({ type: actions.CLEAR_CURRENT_USER })
	dispatch(setSuccess('Successfully signed out'))
}

export const refreshAuthToken = () => async (dispatch: any) => {
	try {
		dispatch({ type: actions.SET_REFRESHING })
		const { getLocalStorage } = useLocalStorage()

		const refreshToken = getLocalStorage('refresh-token')
		if (!refreshToken) {
			dispatch(setError('Please sign in to view this page'))
			dispatch({ type: actions.SET_NOT_REFRESHING })
			dispatch({ type: actions.SIGN_OUT })
			return
		}

		const { data } = await axios.get(`${BASE_URL}/user/refreshtoken`, {
			headers: {
				'refresh-token': refreshToken,
			},
		})

		if (data && data.success) {
			dispatch({ type: actions.SIGN_IN, payload: data })
			dispatch(getUserInfo())
		}
		dispatch({ type: actions.SET_NOT_REFRESHING })
	} catch (error) {
		if (error.response.data) {
			dispatch(setError(error.response.data.message))
		} else {
			console.log(error)
		}
		dispatch({ type: actions.SET_NOT_REFRESHING })
	}
}
