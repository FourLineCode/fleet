import { combineReducers } from 'redux'
import authReducer from './authReducer'
import notificationReducer from './notificationReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	notification: notificationReducer,
})

export default rootReducer
