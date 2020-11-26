const useLocalStorage = () => {
	const getLocalStorage = (key: string) => {
		const data = JSON.parse(window.localStorage.getItem(key)!)

		return data
	}

	const setLocalStorage = (key: string, value: any) => {
		window.localStorage.setItem(key, JSON.stringify(value))
	}

	const removeLocalStorage = (key: string) => {
		window.localStorage.removeItem(key)
	}

	return { getLocalStorage, setLocalStorage, removeLocalStorage }
}

export default useLocalStorage
