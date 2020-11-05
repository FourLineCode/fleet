import axios from 'axios'
import { baseUrl } from '../../config'
import useLocalStorage from '../../hooks/useLocalstorage'
import * as actions from '../types'

export const signin = (credentials) => async (dispatch) => {
	try {
		const response = await axios.post(`${baseUrl}/user/signin`, credentials)
		const data = await response.data

		if (data) {
			dispatch({ type: actions.SIGN_IN, payload: data })
		}

		const [getLocalStorage, setLocalStorage] = useLocalStorage()

		setLocalStorage('refresh-token', data.refreshToken)
	} catch (error) {
		dispatch({ type: actions.SIGN_IN_ERROR, payload: error.response })
	}
}

export const signout = () => (dispatch) => {
	dispatch({ type: actions.SIGN_OUT })
	dispatch({ type: actions.CLEAR_CURRENT_USER })
}
