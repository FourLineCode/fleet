import axios from 'axios'
import { BASE_URL } from '../../utils/config'
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
	} catch (error) {
		if (error.response) {
			dispatch(setError(error.response.data.message))
		} else {
			console.log(error)
		}
	}
}

export const signout = () => async (dispatch: any) => {
	try {
		const res = await axios.post(`${BASE_URL}/user/signout`)

		if (res.data.success) {
			dispatch({ type: actions.SIGN_OUT })
			dispatch({ type: actions.CLEAR_CURRENT_USER })
			dispatch(setSuccess('Successfully signed out'))
		}
	} catch (error) {
		if (error.response) {
			dispatch(setError(error.response.data.message))
		} else {
			console.log(error)
		}
	}
}

export const refreshAuthToken = () => async (dispatch: any) => {
	try {
		const { data } = await axios.get(`${BASE_URL}/user/refreshtoken`)

		if (data && data.success) {
			dispatch({ type: actions.SIGN_IN, payload: data })
			dispatch(getUserInfo())
		}

		dispatch({ type: actions.SET_NOT_REFRESHING })
	} catch (error) {
		console.log(error)
		dispatch({ type: actions.SET_NOT_REFRESHING })
	}
}
