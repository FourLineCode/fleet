export const useLocalStorage = () => {
	const getLocalStorage = (key: string) => {
		if (process.browser) {
			const data = JSON.parse(window.localStorage.getItem(key)!)

			return data
		}
	}

	const setLocalStorage = (key: string, value: any) => {
		if (process.browser) {
			window.localStorage.setItem(key, JSON.stringify(value))
		}
	}

	const removeLocalStorage = (key: string) => {
		if (process.browser) {
			window.localStorage.removeItem(key)
		}
	}

	return { getLocalStorage, setLocalStorage, removeLocalStorage }
}
