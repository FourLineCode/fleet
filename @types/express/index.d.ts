declare namespace Express {
	interface Request {
		admin?: boolean
		authorized: boolean
		user: User
		userId: string
	}
}
