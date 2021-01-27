import axios from 'axios'
import { BASE_URL } from '../../utils/config'
import * as actions from '../types'
import { setError } from './notificationActions'

export const getUserInfo = () => async (dispatch: any, getState: any) => {
	try {
		const auth = getState().auth

		const response = await axios.get(`${BASE_URL}/user/info/${auth.id}`)

		if (response.data) {
			dispatch({ type: actions.GET_USER_INFO, payload: response.data })
		}
	} catch (error) {
		dispatch(setError(error.response.data.message))
	}
}
