import { createWrapper } from 'next-redux-wrapper'
import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'

const makeStore = () => {
	const composeEnhancers = process.env.NODE_ENV !== 'production' ? composeWithDevTools : compose
	const middlewares = [thunk]

	//@ts-ignore: typescript ignore this
	return createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))
}

export default createWrapper(makeStore)
