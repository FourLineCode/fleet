import axios from 'axios'
import { baseUrl } from '../../config'
import * as actions from '../types'

export const signin = (credentials) => async (dispatch) => {
	try {
		const response = await axios.post(`${baseUrl}/user/signin`, credentials)
		const data = await response.data

		if (data) {
			dispatch({ type: actions.SIGN_IN, payload: data })
		}
	} catch (error) {
		dispatch({ type: actions.SIGN_IN_ERROR, payload: error.response })
	}
}
