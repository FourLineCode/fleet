import cookie from 'cookie'

export const createCookie = (name: string, value: string, age: number) => {
	return cookie.serialize(name, value, {
		httpOnly: true,
		sameSite: 'strict',
		maxAge: age * 60 * 60 * 24,
	})
}
