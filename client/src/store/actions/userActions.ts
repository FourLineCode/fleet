import axios from 'axios'
import { BASE_URL } from '../../config'
import * as actions from '../types'
import { setError } from './notificationActions'

export const getUserInfo = () => async (dispatch: any, getState: any) => {
	try {
		const { token } = getState().auth

		const response = await axios.get(`${BASE_URL}/user/info`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})

		if (response.data) {
			dispatch({ type: actions.GET_USER_INFO, payload: response.data })
		}
	} catch (error) {
		dispatch(setError(error.response.data.message))
	}
}
