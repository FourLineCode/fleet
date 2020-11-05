import { useState } from 'react'

const useLocalStorage = () => {
	const getLocalStorage = (key) => {
		const data = JSON.parse(window.localStorage.getItem(key))

		return data
	}

	const setLocalStorage = (key, value) => {
		window.localStorage.setItem(key, JSON.stringify(value))
	}

	return [getLocalStorage, setLocalStorage]
}

export default useLocalStorage
