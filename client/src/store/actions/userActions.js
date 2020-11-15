import axios from 'axios'
import { BASE_URL } from '../../config'
import * as actions from '../types'

export const getUserInfo = () => async (dispatch, getState) => {
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
		console.log(error)
		dispatch({ type: actions.GET_USER_INFO_ERROR, payload: error.response })
	}
}
