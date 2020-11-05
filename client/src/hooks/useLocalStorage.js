const useLocalStorage = () => {
	const getLocalStorage = (key) => {
		const data = JSON.parse(window.localStorage.getItem(key))

		return data
	}

	const setLocalStorage = (key, value) => {
		window.localStorage.setItem(key, JSON.stringify(value))
	}

	const removeLocalStorage = (key) => {
		window.localStorage.removeItem(key)
	}

	return { getLocalStorage, setLocalStorage, removeLocalStorage }
}

export default useLocalStorage
