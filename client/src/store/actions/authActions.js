import axios from 'axios'
import { baseUrl } from '../../config'
import useLocalStorage from '../../hooks/useLocalstorage'
import { getUserInfo } from './userActions'
import * as actions from '../types'

export const signin = (credentials) => async (dispatch) => {
	try {
		const response = await axios.post(`${baseUrl}/user/signin`, credentials)
		const data = await response.data

		if (data) {
			dispatch({ type: actions.SIGN_IN, payload: data })
			dispatch(getUserInfo())
		}

		const { setLocalStorage } = useLocalStorage()

		setLocalStorage('refresh-token', data.refreshToken)
	} catch (error) {
		dispatch({ type: actions.SIGN_IN_ERROR, payload: error.response })
	}
}

export const signout = () => (dispatch) => {
	const { removeLocalStorage } = useLocalStorage()
	removeLocalStorage('refresh-token')

	dispatch({ type: actions.SIGN_OUT })
	dispatch({ type: actions.CLEAR_CURRENT_USER })
}

export const refreshAuthToken = () => async (dispatch) => {
	try {
		const { getLocalStorage } = useLocalStorage()

		const refreshToken = getLocalStorage('refresh-token')
		if (!refreshToken) {
			dispatch({ type: actions.SIGN_OUT })
			return
		}

		const { data } = await axios.get(`${baseUrl}/user/refreshtoken`, {
			headers: {
				'refresh-token': refreshToken,
			},
		})

		if (data && data.success) {
			dispatch({ type: actions.SIGN_IN, payload: data })
			dispatch(getUserInfo())
		}
	} catch (error) {
		dispatch({ type: actions.SIGN_IN_ERROR, payload: error.response })
	}
}
